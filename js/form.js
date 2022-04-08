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

function checkContact(x){
    if (x == "Yes"){
        console.log(x)
        document.getElementById("contact_name").style.display ="block";
        document.getElementById("contact_email").style.display ="block";
        document.getElementById("contact_phone").style.display ="block";
        document.getElementById("spoken_with_contact").style.display ="block";
    }
    else if (x == "No"){
        console.log(x)
        document.getElementById("contact_name").style.display ="none";
        document.getElementById("contact_email").style.display ="none";
        document.getElementById("contact_phone").style.display ="none";
        document.getElementById("spoken_with_contact").style.display ="none";
    }
}

$(function() {
    $('#referal_submit_button').on('click', function(e) {
        e.preventDefault();
        document.getElementById("spinner").style.display = "block";
        document.getElementById("referal-form").style.display = "none";
        console.log("form clicked");
        let name = $("#name").val();
        let company = $("#company").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let business_duration = $("#business_duration").val();
        let have_contact_in_business = $("#have_contact_in_business").val();
        let contact_name 
        let contact_email 
        let contact_phone 
        let spoken_with_contact
        if (have_contact_in_business == "Yes"){
            contact_name = document.getElementById("contact_name");
            contact_email = document.getElementById("contact_email");
            contact_phone = document.getElementById("contact_phone");
            spoken_with_contact = document.getElementById("spoken_with_contact");
        }
        else{
            contact_name = "Nil";
            contact_email = "Nil";
            contact_phone = "Nil";
            spoken_with_contact = "Nil";
        }
        
        let website = document.getElementById("website");
        let trading_business = document.getElementById("trading_business");

        let data = {
            name: name,
            company: company,
            email: email,
            phone: phone,
            business_duration: business_duration,
            have_contact_in_business: have_contact_in_business,
            contact_name: contact_name,
            contact_email:contact_email,
            contact_phone:contact_phone,
            website:website,
            spoken_with_contact:spoken_with_contact,
            trading_business:trading_business

        }
        $.ajax({
            url: base_url + '/refferal',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function(response) {
                document.getElementById("spinner").style.display = "none";
                if (response.success === true && response.status === 200) {
                    
                    document.getElementById("referal-form").style.display = "none";
                    document.getElementById("image-div").style.display = "block";
                    document.getElementById('message-202').innerHTML = '';
                    document.getElementById('message').innerHTML = response.message;
                } else if (response.success === false && response.status === 202) {
                    document.getElementById('message-202').innerHTML = response.message;
                    document.getElementById("referal-form").style.display = "block";
                    
                } else {
                    document.getElementById('message-202').innerHTML = '';
                    document.getElementById("referal-form").style.display = "none";
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