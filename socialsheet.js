function load(url) {
  fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson.feed);
        build(myJson.feed);
      });
      function build(json) {
      document.title = json.title.$t;
      var profiles = json.entry;
        var row = document.createElement("div");
        row.className = "row";
        var body = document.getElementById("body").appendChild(row); 
      for (var i = 0; i < profiles.length; i++) {
        if(profiles[i].gsx$break.$t) {
          row = document.createElement("div");
          row.className = "row";
          body = document.getElementById("body").appendChild(row); 
        }
        else {
          row.appendChild(element(profiles[i]));
        }
      }
    }
}
function element(profile) {
      var element = document.createElement("div");
      var content = document.createElement("div");
      element.className = "col-sm";
      if(profile.hasOwnProperty("gsx$color")&&profile.gsx$color.$t) {
        element.style.color = profile.gsx$color.$t;
      }
      if(profile.hasOwnProperty('gsx$position')&&profile.gsx$position.$t) {
        element.style.textAlign = profile.gsx$position.$t;
      }
      if(profile.hasOwnProperty('gsx$text')&&profile.gsx$text.$t) {
        if(profile.hasOwnProperty('gsx$size')&&profile.gsx$size.$t) {
          var text = document.createElement("h"+profile.gsx$size.$t);
        }
        else {
          var text = document.createElement("h2");
        }
        text.innerHTML = profile.gsx$text.$t;
        content.appendChild(text);
      }
      if(profile.hasOwnProperty('gsx$image')&&profile.gsx$image.$t) {
          checkImage(profile.gsx$image.$t, function(){ var img = document.createElement('img');
          img.src = profile.gsx$image.$t; img.className = "img-fluid"; content.appendChild(img);}, function(){} );
      }
      if(profile.hasOwnProperty('gsx$background')&&profile.gsx$background.$t) {
          checkImage(profile.gsx$background.$t, function(){ var img = document.createElement('img');
          element.style.backgroundImage = "url('"+profile.gsx$background.$t+"')";}, function(){
                    element.style.backgroundColor = profile.gsx$background.$t;
          } );
      }
      if(profile.hasOwnProperty('gsx$font')&&profile.gsx$font.$t) {
        WebFont.load({
          google: {
            families: [profile.gsx$font.$t]
          }
        });
        element.style.fontFamily = profile.gsx$font.$t;      
      }
      if(profile.hasOwnProperty('gsx$link')&&profile.gsx$link.$t) {
        var link = document.createElement("a");
        link.href = profile.gsx$link.$t;
        link.style.color
        link.appendChild(content);
        content = link;
      }
      if(profile.hasOwnProperty('gsx$body')&&profile.gsx$body.$t) {
        var p = document.createElement("p");
        p.innerHTML = profile.gsx$body.$t;
        content.appendChild(p);
      }
      if(profile.hasOwnProperty('gsx$youtube')&&profile.gsx$youtube.$t) {
        var embed = document.createElement("div");
        embed.className = "embed-responsive embed-responsive-16by9"
        embed.innerHTML = profile.gsx$youtube.$t;
        content.appendChild(embed);
      }
      if(profile.hasOwnProperty('gsx$soundcloud')&&profile.gsx$soundcloud.$t) {
        var embed = document.createElement("div");
        embed.innerHTML = profile.gsx$soundcloud.$t;
        content.appendChild(embed);
      }
      if(profile.hasOwnProperty('gsx$embed')&&profile.gsx$embed.$t) {
        var embed = document.createElement("div");
        embed.innerHTML = profile.gsx$embed.$t;
        content.appendChild(embed);
      }

      if(profile.hasOwnProperty('gsx$audio')&&profile.gsx$audio.$t) {
        const audio = document.createElement('audio');
        audio.src = profile.gsx$audio.$t;
        audio.controls = true;
        if(profile.hasOwnProperty('gsx$hidecontrols')&&profile.gsx$hidecontrols.$t) {
          audio.controls = false;
        }
        if(profile.hasOwnProperty('gsx$loop')&&profile.gsx$loop.$t) {
          audio.loop = true;
        }
        if(profile.hasOwnProperty('gsx$autoplay')&&profile.gsx$autoplay.$t) {
          audio.autoplay = true;
        }
        content.appendChild(audio);
      }
      if(profile.hasOwnProperty('gsx$video')&&profile.gsx$video.$t) {
        const video = document.createElement('video');
        video.src = profile.gsx$video.$t;
        video.controls = true;
        video.style.width = "100%";
        video.style.height = "auto";
        if(profile.hasOwnProperty('gsx$autoplay')&&profile.gsx$autoplay.$t) {
          video.autoplay = true;
        }
        content.appendChild(video);
      }
      element.appendChild(content);
      return element;
  }
      function checkImage(imageSrc, good, bad) {
        var img = new Image();
        img.onload = good; 
        img.onerror = bad;
        img.src = imageSrc;
     }      