var releaseVer = '27066,344945000';
var baseUrl = document.getElementById('seaJS').getAttribute('data-base');
define(function(require, exports) {
  var init = function(filename) {
    require("jquery");
    var mods = filename.split(',');   //将js的字符串按照','分割成数组形式
    var modName;
    for(var i in mods){
      modName = mods[i];
      if (modName) {
        require.async('./' + modName + '.js?t='+releaseVer, function(mod) {
          if (mod && mod.init) {
            mod.init();
          }
        });
      }
    }
  };
  exports.init = init;
});
(function(){
  var alias = {
    'jquery':'jquery-1.11.1.min'
  };


  seajs.config({
    alias: alias,
    base: baseUrl,
    map: [
       [/^(.*\/js\/(.*)\/.*\.(?:css|js))(?:.*)$/i, '$1?'+releaseVer]
    ]
  });
})();
