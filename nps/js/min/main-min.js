$(document).ready(function(){function e(e){var n=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;return n.test(e)?!0:!1}$(".men-form-btn").click(function(n){var a=$(".men-form-input").val();0===$.trim(a).length&&(alert("Please enter valid email address"),n.preventDefault()),e(a)?(n.preventDefault(),$(".men-form").addClass("hidden"),$(".men-form-success").removeClass("hidden"),$(".men-form-success").addClass("visible")):(alert("Invalid Email Address"),n.preventDefault())}),$(".men-form-input").focusout(function(){var e=$(".men-form-input").val(),n=analytics.user().anonymousId();console.log("valeur email :"+e),window.augurAPI="http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&email="+e,$.getJSON(augurAPI).done(function(a){console.log("success: we have to parse data"),console.log(a),console.log("anoID is :"+n),analytics.identify(""+n,{email:e}),analytics.identify(""+n,{name:a.PRIVATE.name,gender:a.DEMOGRAPHICS.gender,city:a.GEOGRAPHICS.location_city,country:a.GEOGRAPHICS.location_country,twitter:a.PROFILES.twitter_handle,bioTwitter:a.PRIVATE.bio[0].value,linkedin:a.PROFILES.linkedin_handle})}).fail(function(){console.log("failed to get json from augur API")}),analytics.track("Registered for ebook",{ebookName:"NPS"})})});