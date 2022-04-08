base_url = "https://quidroo-be.herokuapp.com"
$(function() {
    $('#form_submit_button').on('click', function(e) {
        e.preventDefault();
        document.getElementById("spinner").style.display = "block";
        document.getElementById("notify-form").style.display = "none";
        console.log("form clicked");
        let name = $("#name").val();
        let company = $("#company").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let type_business = $("#type_business").val();
        let address = $("#address").val();
        let confirm_female_cofounder = null
        let female_cofounder = document.getElementById("female_cofounder");

        if (female_cofounder.checked == false) {
            confirm_female_cofounder = "No"
        } else {
            confirm_female_cofounder = "Yes"
        }

        let data = {
            name: name,
            company: company,
            email: email,
            phone: phone,
            type_business: type_business,
            address: address,
            confirm_female_cofounder: confirm_female_cofounder,

        }
        $.ajax({
            url: base_url + '/notify_me',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function(response) {
                document.getElementById("spinner").style.display = "none";
                if (response.success === true && response.status === 200) {
                    
                    document.getElementById("notify-form").style.display = "none";
                    document.getElementById("image-div").style.display = "block";
                    document.getElementById('message-202').innerHTML = '';
                    document.getElementById('message').innerHTML = response.message;
                } else if (response.success === false && response.status === 202) {
                    document.getElementById('message-202').innerHTML = response.message;
                    document.getElementById("notify-form").style.display = "block";
                    
                } else {
                    document.getElementById('message-202').innerHTML = '';
                    document.getElementById("notify-form").style.display = "none";
                    document.getElementById("image-div-two").style.display = "block";
                    document.getElementById('message-fail').innerHTML = response.message;
                }
                console.log("SUCCESSFUL RESPONSE: ", response)

            },
            error: function(error) {
                console.log("ERROR: ", error)
            }
        });
        return false;
    })
});