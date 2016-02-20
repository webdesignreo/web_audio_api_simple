$(document).ready(function () {
  //web audio apiを使うためのAudioContextの宣言
  window.AudioContext = window.AudioContext||window.webkitAudioContext; //互換対応
  //インスタンスの生成
  var audioContext = new AudioContext();
  //音量調整
  var gainNode = audioContext.createGain();
  //decodeAudioData() メソッドでデータ形式を変更
  window.AudioHelper = function(){}
  var audioHelper = new AudioHelper(audioContext);
  audioHelper.loadAudioBuffer = function(audioContext, url){
      console.log(AudioContext.decodeAudioData, '>>>AudioContext.decodeAudioData>>>');
      console.log(audioContext.decodeAudioData, '>>>audioContext.decodeAudioData>>>');
      var DecodeAudioFile, DecodeCb;
      var _decodeAudioDataBefore = function(audioFile, cb){
              //AudioContext.decodeAudioData
              console.log(AudioContext, '>>>>AudioContext>>>>');
              console.log(audioContext, '>>>>audioContext>>>>');
              console.log(audioFile, '>>>>audioFile>>>>');
              //.decodeAudioData
              //decodeAudioData
              DecodeAudioFile = audioFile;
              DecodeCb = cb;
              return DecodeAudioFile;
              return DecodeCb;
      }
      _decodeAudioDataBefore();
      /*var _decodeAudioData = function(){

      }*/
      audioContext.decodeAudioData(
          DecodeAudioFile,
          //success callback
          function(buffer) {
              if (!buffer) {
                  alert('error decoding file data: ' + url);
                  return;
              }
              DecodeCb(buffer);
          },
          //error callback
          function(error) {
              alert('decodeAudioData error', error);
          }
      );
      //XMLHttpRequestとして取得
      var _requestFile = function(cb){
          var _xhr = new XMLHttpRequest();
          _xhr.open("GET", url, true);
          _xhr.responseType = "arraybuffer";
          _xhr.onload = function(){
              cb(_xhr.response);
          };
          _xhr.send();
      }
      return new Promise(function(resolve, reject){
          _requestFile(function(response){
              _decodeAudioData(response, function(buffer){
                  resolve(buffer);
              });
          });
      });
  }



  //選択中の Audio データ
  var selectionAudio = {
      buffer: '',
      bufferSource: ''
  }

  //エレメントとトリガー定義
  var el = new function(){
      var o = this;
      console.log(o, '>>>this>>');
      o.player = document.querySelector('.audioPlayer');
      console.log(o.player, 'o.player');
      o.music = o.player.querySelector('.music');
      o.play = o.player.querySelector('.play');
      o.stop = o.player.querySelector('.stop');
      o.status = o.player.querySelector('.status');
      o.valume = o.player.querySelector('.volume');
      o.status = o.player.querySelector('.status');
      o.play.addEventListener('click', function(){
          action.play();
      }, false);
      o.stop.addEventListener('click', function(){
          action.stop();
      }, false);
      o.valume.addEventListener('change', function(){
          action.volume(this.value);
      }, false);
      o.music.addEventListener('change', function(){
          action.selectionMusic().then(function(){
              action.play();
          });
      }, false);
  }

  //プレイヤーの機能
  var action = {
      play : function(){
          if(!selectionAudio.buffer) return;
          action.stop();
          var bufferSource = audioContext.createBufferSource();
          bufferSource.buffer = selectionAudio.buffer;
          bufferSource.connect(gainNode);
          bufferSource.start(audioContext.currentTime + 0.100);
          selectionAudio.bufferSource = bufferSource;
      },
      stop : function(){
          if(!selectionAudio.bufferSource) return;
          selectionAudio.bufferSource.stop();
          selectionAudio.bufferSource.disconnect();
          selectionAudio.bufferSource = '';
      },
      volume : function(valume){
          gainNode.gain.value = valume;
      },
      selectionMusic : function(){
          el.status.textContent = 'now loading...';
          return new Promise(function(resolve){
              var key = el.music.options[el.music.selectedIndex].textContent;
              console.log(key, '>>>key>>>');
              var url = el.music.value;
              console.log(url, '>>>>>url>>>>');
              console.log(audioHelper.loadAudioBuffer,'>>>>audioHelper.loadAudioBuffer>>>');
              return audioHelper.loadAudioBuffer(key, url).then(function(buffer){
                  el.status.textContent = 'music loaded !';
                  selectionAudio.buffer = buffer;
                  resolve();
              });
          })
          console.log(audioHelper.loadAudioBuffer,'>>>>audioHelper.loadAudioBuffer>>>');
      }
      //console.log(audioHelper.loadAudioBuffer,'>>>>audioHelper.loadAudioBuffer>>>');
  }
  console.log(audioHelper.loadAudioBuffer,'>>>>audioHelper.loadAudioBuffer>>>');

  //接続
  gainNode.connect(audioContext.destination);

  //デフォルトファイルの取得
  action.selectionMusic();

  });
