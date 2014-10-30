// This piece code is to buffer the status bar from header in iOS 7
// Source = http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/
function onDeviceReady() {
    if (parseFloat(window.device.version) === 7.0) {
          document.body.style.marginTop = "20px";
    }
}
  
// ------------------------------------------------------------------------------------------
// Wipes the Username input on click
// ------------------------------------------------------------------------------------------
  function wipeValueUsername()
  {
      document.getElementById('email').setAttribute('value', " ");     
  }

// ------------------------------------------------------------------------------------------
// Password Title Code
// There is two inputs for password one for title and the second for input
// This code alternates the visablity of the code depending on the focus
// ------------------------------------------------------------------------------------------
function setPasswordInputs()
{
    $('#password-clear').show();
    $('#password-password').hide();
    $('#password-clear').focus(function() {
    $('#password-clear').hide();
    $('#password-password').show();
    $('#password-password').focus();
});

$('#password-password').blur(function() {
if($('#password-password').val() === '') 
    {
        $('#password-clear').show();
        $('#password-password').hide();
    }
});

// Change the username title back in still blank
$('#username').blur(function() {
if($('#username').val() === '')
    {
        document.getElementById('username').setAttribute('value', "Username");
    }
});
}

// ------------------------------------------------------------------------------------------
// ------------------------------ Floatlabel for form inputs  -------------------------------
// ------------------------------------------------------------------------------------------

$(document).ready(function () {
    $('.floatlabel_1').floatlabel();
});


$(document).ready(function () {

$( "#loginType" ).change(function() {
    var value = $('input[name=radio-loginSignUp]:checked').val();
    if(value === "signUp")
    {
        $('input[name=submitBtn]').val('Sign Up').button( "refresh" );
        $("#forgotPass").css("visibility", "hidden");
        $("#fbText").text(' Sign up with Facebook');
    }
    else
    {
        $('input[name=submitBtn]').val('Login').button( "refresh" );
        $("#forgotPass").css("visibility", "visible");
        $("#fbText").text(' Log in with Facebook');
    }    
});

});

// ------------------------------------------------------------------------------------------
// ------------------------------ Camera Function  -------------------------------
// ------------------------------------------------------------------------------------------


// A click event for each emoji which creates a token in local storage to aid empji post
$(document).ready(function(){
    $( "#emojiSelect-1" ).click(function() {
        console.log('Camera Clicked');
        window.localStorage.setItem('parentEmoji', '1');
        //alert('hi! camera');
        camera();   
    });
});
  
$(document).ready(function(){
    $( "#emojiSelect-2" ).click(function() {
        console.log('Camera Clicked');
        window.localStorage.setItem('parentEmoji', '2');
        //alert('hi! camera');
        camera();   
    });
});
  
$(document).ready(function(){
    $( "#emojiSelect-3" ).click(function() {
        console.log('Camera Clicked');
        window.localStorage.setItem('parentEmoji', '3');
        //alert('hi! camera');
        camera();   
    });
});
  
$(document).ready(function(){
    $( "#emojiSelect-4" ).click(function() {
        console.log('Camera Clicked');
        window.localStorage.setItem('parentEmoji', '4');
        //alert('hi! camera');
        camera();   
    });
});
  
$(document).ready(function(){
    $( "#emojiSelect-5" ).click(function() {
        console.log('Camera Clicked');
        window.localStorage.setItem('parentEmoji', '5');
        //alert('hi! camera');
        camera();   
    });
});
  
$(document).ready(function(){
    $( "#emojiSelect-6" ).click(function() {
        console.log('Camera Clicked');
        window.localStorage.setItem('parentEmoji', '6');
        //alert('hi! camera');
        camera();   
    });
});
    
function camera()
{
    //alert('camera function');
    // Place camera phonegap function here
    navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 48, 
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 960,
        targetHeight: 960,
        saveToPhotoAlbum: true,
        correctOrientation: false,
        allowEdit: true
    });
    console.log('Camera opened on phone');

    function onSuccess(imageURI) 
    {
        console.log('Camera opened and image was captured');
        var image = document.getElementById('imageHolder'); 
        image.src = imageURI;
        console.log('Image placed into DIV, page change now');
        console.log(imageURI);
        window.localStorage.setItem('imageURI', imageURI);
        // Changes the Overlay for parent emojis
        var imageOverlayType = window.localStorage.getItem('parentEmoji');
        console.log('The parent emoji is = '+imageOverlayType);
        var imageOverlay = document.getElementById('hexOverlay'); 
        imageOverlay.src = 'images/insert/insertBg_'+imageOverlayType+'.png';
        console.log('images/insert/insertBg_'+imageOverlayType+'.png');
        console.log('page set lets change');
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#emotionPostPage", { transition: "slidedown" } );       
    }

    function onFail(message) 
    {
        console.log('Camera Failed to load' +message);
        //alert('Failed because: ' + message);
    }   
}

// -------------------------------------------------------------------------------------------
// ----------------------------------  Post to map  ---------------------------- 
// ------------------------------------------------------------------------------------------- 
$(document).on('click', '#postToMapBtn', function(){ 
    
    console.log('Post to map clicked:');
    // userID, emoType, emoji, imageName, songID, public, lat, long, timeLocal
    
    var postLat;
    var postLong; 
    
    var onSuccess = function(position)
    {
        postLat = position.coords.latitude;
        postLong = position.coords.longitude;
        console.log('postLat is '+postLat +' and postLong is '+postLong);
        sendPost();
    };
    function onError(error) 
    {
        postLat = window.localStorage.getItem('setViewLat');
        postLong = window.localStorage.setItem('setViewLong');
        console.log('Geo local fail postLat is '+postLat +' and postLong is '+postLong);
        sendPost();
    };
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
    function sendPost()
    {
        var userID = window.localStorage.getItem('userID');
        var userEmail = window.localStorage.getItem('email');
        console.log('User Email: '+userEmail);
        var parentEmoji = window.localStorage.getItem('parentEmoji');
        console.log('Parent Emoji: '+parentEmoji);    
        var emojiSentence = $('#emojiSentDiv').html();
        console.log('emoji sentence: '+emojiSentence);
        var timeStmp = $.now();
        var imageNameStr = timeStmp+'_'+userID;
        console.log('Image Name: '+imageNameStr);
        var musicId = '1234';
        console.log('Music ID: '+musicId);
        var postPublic = 1;
        console.log('Public Post: '+postPublic);
        var now = new Date();
        var month = now.getMonth() + 1;
        var timeDevice = now.getFullYear()+'-'+month+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
        console.log('Time on Device: '+timeDevice);  
        
        function uploadPhoto(fileNameStr) {

            $.mobile.loading( "show", {
            text: 'Image uploading ...',
            textVisible: true
            });
            
            var imageURI = window.localStorage.getItem('imageURI');
            
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=fileNameStr;
            options.mimeType="image/jpeg";

            var params = {};
            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://icandraw.me/sensus/php/uploadImage.php"), win, fail, options);
        }

        function win(r) {

            $.mobile.loading( "hide" );            
            console.log("--- Code has Worked? --- ");
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            // Do page change on file upload
            //mapSetView(postLat, postLong);
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "#mapPage", { transition: "slidedown" } );     
        }

        function fail(error) {
            
            $.mobile.loading( "hide" );            
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
                
        // Start the file upload process        
        uploadPhoto(imageNameStr);

        $.ajax({url: 'http://icandraw.me/sensus/php/postToMap.php',
            data: {
                action : 'post', userEmail: userEmail, 
                parentEmoji: parentEmoji, emojiSentence:emojiSentence, 
                imageLocation:imageNameStr, musicId:musicId, 
                postPublic:postPublic, postLat:postLat, 
                postLong:postLong, timeDevice:timeDevice
            },
            type: 'post',
            datatype : 'text',
            async: 'true',
            beforeSend: function() {
                // This callback function will trigger before data is sent
                console.log('Before send ');
                //$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
            },
            complete: function() {
                // This callback function will trigger on data sent/received complete
                console.log('Complete ');
                //$.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
            },
            success: function (result) {
                console.log('Database call was : '+result);
                console.log('Post was inserted to database '+result);
                console.log('Variables are - Post ID: '+result +' '+postLat+' '+postLong+' - Parent: '+parentEmoji);
                addMarkerToMap(parentEmoji, result, postLat, postLong);
                centerMap(postLat,postLong);
                //$('')
            },
            error: function (results, error) {
                // This callback function will trigger on unsuccessful action               
                $('#postToMapBtn').html('Post Failed'+error+' '+results.postID+' '+results.status);
                console.log('Post Failed '+error+' '+results.postID+' '+results.status);
            }
        }); 
    };
});


// -------------------------------------------------------------------------------------------
// ----------------------------------  emoji Keypad ---------------------------- 
// ------------------------------------------------------------------------------------------- 

$(document).ready(function()
{
    $('.emojiRender').each(function(i, d){
        console.log('emoji img code set');
        $(d).emoji();
    });

    // Set local storage value for keypad
    window.localStorage.setItem('emojiKeypad', 'off');   
    $("#toggle").click(function(){
        
        $("#panel").slideToggle("fast"); 
        // Get keypad on/off value
        var keypadOnOff = window.localStorage.getItem('emojiKeypad');  
        // Checks which position keypad is in
        if(keypadOnOff === 'off')
        {
            console.log('emoji keypad opened');
            $('#toggle').html('close');
            $("#insertButtons").velocity({top: "-=100", easing: "easein"}, 400).delay( 800 );
            window.localStorage.setItem('emojiKeypad', 'on');
        }
        else
        {
            console.log('emoji keypad closed');
            $('#toggle').html('emoji Description');
            $("#insertButtons").velocity({top: "+=100", easing: "easein"}, 400).delay( 800 );
            window.localStorage.setItem('emojiKeypad', 'off');
        }      
    });   
});


// load the emoji keypad
$(document).on("pagecreate","#emotionPostPage",function(){
    
    console.log('set tab selection of emoji');    
    var tabIcons = [
        {
	':smile:'     : 'smile.png',
        ':blush:': 'blush.png',
	':smiley:'     : 'smiley.png',
        ':relaxed:'  : 'relaxed.png',
        ':smirk:'  : 'smirk.png',
        ':heart_eyes:'  : 'heart_eyes.png',
        ':kissing_heart:': 'kissing_heart.png',
        ':kissing_face:': 'kissing_face.png',
	':flushed:'   : 'flushed.png',
	':relieved:'   : 'relieved.png',
        ':satisfied:': 'satisfied.png',
        ':grin:'  : 'grin.png',
        ':wink:': 'wink.png',
        ':wink2:': 'wink2.png',
        ':tongue:'  : 'tongue.png',
        ':expressionless:': 'expressionless.png',
        ':unamused:'  : 'unamused.png',
        ':sweat:'  : 'sweat.png',
        ':pensive:'  : 'pensive.png',
        ':anguished:': 'anguished.png',
        ':disappointed:'  : 'disappointed.png'
    },{
        ':confounded:'  : 'confounded.png',
        ':fearful:': 'fearful.png',
        ':cold_sweat:'  : 'cold_sweat.png',
        ':grimacing:' : 'grimacing.png',
        ':persevere:': 'persevere.png',
        ':cry:'  : 'cry.png',
        ':sob:'  : 'sob.png',
        ':joy:': 'joy.png',
        ':astonished:': 'astonished.png',
	':scream:'  : 'scream.png',
        ':angry:'     : 'angry.png',
        ':rage:'  : 'rage.png',
        ':sleepy:'  : 'sleepy.png',
        ':sleeping:': 'sleeping.png',
        ':eyes:': 'eyes.png',
        ':mask:'  : 'mask.png',
        ':imp:'  : 'imp.png',
        ':alien:'  : 'alien.png',
        ':yellow_heart:'  : 'yellow_heart.png',
        ':blue_heart:'  : 'blue_heart.png',
        ':purple_heart:'  : 'purple_heart.png'
    },{
        ':heart:'  : 'heart.png',
        ':green_heart:'  : 'green_heart.png',
        ':broken_heart:'  : 'broken_heart.png',
        ':cupid:'  : 'cupid.png',
        ':sparkles:'  : 'sparkles.png',
        ':star:'  : 'star.png',
        ':star2:'  : 'star2.png',
        ':anger:'  : 'anger.png',
        ':exclamation:'  : 'exclamation.png',
        ':question:'  : 'question.png',
        ':grey_exclamation:'  : 'grey_exclamation.png',
        ':grey_question:'  : 'grey_question.png',
        ':zzz:'  : 'zzz.png',
        ':dash:'  : 'dash.png',
        ':sweat_drops:'  : 'sweat_drops.png',
        ':notes:'  : 'notes.png',
        ':musical_note:'  : 'musical_note.png',
        ':fire:'  : 'fire.png',
        ':poop:'  : 'poop.png',
        ':thumbUp:': 'thumbUp.png',
        ':thumbDown:': 'thumbDown.png'
    },{
    
        }];
    
    // sample to build off 
    console.log('run thru array and add emoji');  
    
    for ( var i = 0; i < 4; i++ ) 
    {
        console.log('This is loop' +i);  
        $.each(tabIcons[i], function( title, png )
        {
            var tabKey = '#tab'+i;
            console.log('added' +title +' emoji' +tabKey);    
            $(tabKey).append('<img class="addEmoji" src="images/emojis/' +png +'" title="' +title +'">');
        });   
    };    
});

// click to add emoji function

$(document).on('click', '.addEmoji', function(){ 
    var emojiName = $(this).attr('title');
    console.log('emoji clicked- Title is = '+emojiName);
    console.log('emoji img added - now refresh p');

    $(".emojiRender").append(emojiName);
    $('.emojiRender').emoji();
 });

// click removes emojis
$(document).on('click', '.removeEmoji', function(){ 
    console.log('emoji img removed');
    $(this).remove();                
}); 

// -------------------------------------------------------------------------------------------
// ------------------------------  When the settingsPage is showen ---------------------------- 
// ------------------------------  This code will trigger ------------------------------------
// -------------------------------------------------------------------------------------------   

$(document).on("pageshow","#profilePage",function(){
          
    // Move Divs on Profile
    $( "#moveDivSettings" ).click(function(){
        console.log('settings clicked');
        $("#profileWrap").velocity({right: "200%", easing: "easein"}, 400);
        $("#indicator").velocity({left: "66%", easing: "easein"}, 400);
    });
    
        $( "#moveDivMiniMap" ).click(function(){
        console.log('mini map clicked');
        $("#profileWrap").velocity({right: "100%", easing: "easein"}, 400);        
        $("#indicator").velocity({left: "33%", easing: "easein"}, 400);       
    });
    
        $( "#moveDivPins" ).click(function(){
        console.log('pins clicked');
        $("#profileWrap").velocity({right: "0%", easing: "easein"}, 400);        
        $("#indicator").velocity({left: "0%", easing: "easein"}, 400);
    });
    
    $('#updateBtn').html('Update Info');
    console.log('Settings page opened');
    var lsEmail = window.localStorage.getItem('email');
    console.log('Fetch LS email '+lsEmail); 
    
    //Fetch the form info
    $.ajax({url: 'http://icandraw.me/sensus/php/updateInfo2.php',
        data: {action : 'info', userEmail: lsEmail },
        type: 'post',
        async: 'true',
        dataType: 'json',
        beforeSend: function() {
            // This callback function will trigger before data is sent
            
            $.mobile.loading( "show", {
            text: '',
            textVisible: true
            });
        },
        complete: function() {
            // This callback function will trigger on data sent/received complete
            $.mobile.loading( "hide" );
        },
        success: function (result) {
            console.log('Info Fetch Succesfull');
            $('#firstName').val(result['firstName']);
            $('#lastName').val(result['lastName']);
            $('#selectGender').val(result['userGender']).selectmenu('refresh');
        },
        error: function (request,error) {
            // This callback function will trigger on unsuccessful action               
            $('#updateBtn').html('There was an error');
            console.log('error = '+error);
            console.log("XMLHttpRequest", XMLHttpRequest);
        }
    });
// -------------------------------------------------------------------------------------------
// ------------  When the update button on settingPage os clicked ---------------------------- 
// ------------------------------  This code will trigger ------------------------------------
// ------------------------------------------------------------------------------------------- 
    $( "#updateBtn" ).click(function() 
    {
        console.log('Update Button Clicked');
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var genderType = $('#selectGender').val();
        var lsEmail = window.localStorage.getItem('email');
        console.log('Fetch LS email'+lsEmail); 
    
    // Update the user info
    $.ajax({url: 'http://icandraw.me/sensus/php/updateInfo.php',
        data: {action : 'update', userEmail: lsEmail, userFirstName : firstName, userLastName : lastName, userGender : genderType },
        type: 'post',
        async: 'true',
        dataType: 'json',
        beforeSend: function() {
            // This callback function will trigger before data is sent
            $.mobile.loading( "show", {
            text: '',
            textVisible: true
            });
        },
        complete: function() {
            // This callback function will trigger on data sent/received complete
            $.mobile.loading( "hide" );
        },
        success: function () {
            console.log('Update Succesfull');
            $('#updateBtn').html('Info Updated');
        },
        error: function (error) {
            // This callback function will trigger on unsuccessful action               
            $('#updateBtn').html('There was an error = '+error);
            console.log('error = '+error);
            console.log("XMLHttpRequest", XMLHttpRequest);
        }
        });     
    }); 



// -------------------------------------------------------------
// ------------  Profile Page Load  ---------------------------- 
// ------------------------------------------------------------- 

    $(document).on("pageshow","#profilePage",function(){
        // Fetch Posts here
        console.log('Getting the Users Posts here');
        var userID = window.localStorage.getItem('userID');
        console.log('Fetch posts by User ID '+lsEmail); 
    
    //Fetch the form info
    $.ajax({url: 'http://icandraw.me/sensus/php/updateInfo2.php',
        data: {action : 'info', userEmail: lsEmail },
        type: 'post',
        async: 'true',
        dataType: 'json',
        beforeSend: function() {
            // This callback function will trigger before data is sent
            
            $.mobile.loading( "show", {
            text: '',
            textVisible: true
            });
        },
        complete: function() {
            // This callback function will trigger on data sent/received complete
            $.mobile.loading( "hide" );
        },
        success: function (result) {
            console.log('Info Fetch Succesfull');
            $('#firstName').val(result['firstName']);
            $('#lastName').val(result['lastName']);
            $('#selectGender').val(result['userGender']).selectmenu('refresh');
        },
        error: function (request,error) {
            // This callback function will trigger on unsuccessful action               
            $('#updateBtn').html('There was an error');
            console.log('error = '+error);
            console.log("XMLHttpRequest", XMLHttpRequest);
        }
    });

    });
});