$(document).ready(function(){function e(e){var n=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;return n.test(e)?!0:!1}$(".men-form-btn").click(function(n){var a=$(".men-form-input").val();0===$.trim(a).length&&(alert("Please enter valid email address"),n.preventDefault()),e(a)?(n.preventDefault(),$(".men-form").addClass("hidden"),$(".men-form-success").removeClass("hidden"),$(".men-form-success").addClass("visible")):(alert("Invalid Email Address"),n.preventDefault())}),analytics.trackForm(form,"Registered for ebook",{ebookName:"NPS"}),$(".men-form-input").focusout(function(){var e=$(".men-form"),n=$(".men-form-input").val();window.augurAPI="http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&email="+n,$.getJSON(augurAPI).done(function(e){console.log("success: we have to parse data"),console.log(e);var a=analytics.user().anonymousId();analytics.identify(""+a,{email:n}),analytics.identify(""+n,{name:e.PRIVATE.name,gender:e.DEMOGRAPHICS.gender,city:e.GEOGRAPHICS.location_city,country:e.GEOGRAPHICS.location_country,twitter:e.PROFILES.twitter_handle,bioTwitter:e.PRIVATE.bio[0].value,linkedin:e.PROFILES.linkedin_handle})}).fail(function(){console.log("failed to get json from augur API")})})});