$(document).ready(function(){var e=null,n=document.referrer,i="twitter";if($("#ac__input-default").is(":visible")){var l=$("#ac__input-default");console.log("ok def")}else if($("#ac__input-mobile").is(":visible")){var l=$("#ac__input-mobile");console.log("ok mob")}n.indexOf(i)>-1&&($("#ac__input-default").attr("type","text"),$("#ac__input-default").attr("placeholder","Your Twitter handle without @")),$(".ac__form").submit(function(e){e.preventDefault(),$(".ac__form-success").removeClass("hidden"),$(".ac__form-success").addClass("visible"),$(".ac__form").addClass("hidden")}),$(window).load(function(){e=analytics.user().id(),null!==e&&e.length>0?(e=analytics.user().id(),console.log("exist, ok")):(e=analytics.user().anonymousId(),console.log("does not exist, switch to anonymous"))}),$(".ac__input").focusout(function(){if(l.val().length>0){var o=$(".ac__form");if(console.log(e),analytics.debug(),n.indexOf(i)>-1){if(console.log("twitter, get augur for twitter"),""!==l.val())var t=l.val();window.augurAPI="http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&twitter_handle="+t,$.getJSON(augurAPI).done(function(n){console.log("got twitter data"),console.log("begin identify"),properties={email:null,name:null,gender:null,location:null,linkedin:null,title:null},void 0!==n.DEMOGRAPHICS.gender&&n.DEMOGRAPHICS.gender.length>0&&(properties.gender=n.DEMOGRAPHICS.gender.name[0].value),void 0!==n.PRIVATE.name&&n.PRIVATE.name.length>0&&(properties.name=n.PRIVATE.name[0].value),void 0!==n.PRIVATE.email&&n.PRIVATE.email.length>0&&(properties.email=n.PRIVATE.email[0].value),void 0!==n.GEOGRAPHICS.location&&n.GEOGRAPHICS.location.length>0&&(properties.location=n.GEOGRAPHICS.location[0].value),void 0!==n.PROFILES.linkedin_handle&&n.PROFILES.linkedin_handle.length>0&&(properties.linkedin=n.PROFILES.linkedin_handle[0].value),void 0!==n.PRIVATE.description&&n.PRIVATE.description.length>0&&(properties.title=n.PRIVATE.description[0].value),analytics.identify(""+e,properties),console.log("begin track"),analytics.track("Registered for academy"),analytics.debug(),console.log("end")}).fail(function(){console.log("failed to get json from augur API")})}else{if(console.log("no-ref, get augur for email"),""!==l.val())var a=l.val();window.augurAPI="http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&email="+a,$.getJSON(augurAPI).done(function(e){console.log("got mail data"),console.log("begin identify"),properties={email:a,name:null,gender:null,location:null,twitter:null,linkedin:null,title:null},void 0!==e.DEMOGRAPHICS.gender&&e.DEMOGRAPHICS.gender.length>0&&(properties.gender=e.DEMOGRAPHICS.gender[0].value),void 0!==e.PRIVATE.name&&e.PRIVATE.name.length>0&&(properties.name=e.PRIVATE.name[0].value),void 0!==e.PROFILES.twitter_handle&&e.PROFILES.twitter_handle.length>0&&(properties.twitter=e.PROFILES.twitter_handle[0].value),void 0!==e.GEOGRAPHICS.location&&e.GEOGRAPHICS.location.length>0&&(properties.location=e.GEOGRAPHICS.location[0].value),void 0!==e.PROFILES.linkedin_handle&&e.PROFILES.linkedin_handle.length>0&&(properties.linkedin=e.PROFILES.linkedin_handle[0].value),void 0!==e.PRIVATE.description&&e.PRIVATE.description.length>0&&(properties.title=e.PRIVATE.description[0].value),console.log("begin track"),analytics.track("Registered for academy"),console.log("end")}).fail(function(){console.log("failed to get json from augur API")})}}})});