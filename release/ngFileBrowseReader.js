/*
	icenold
*/
angular.module('ngFileBrowseReader',[])
.directive('ngReader',function(){
	return{
		restrict:'A',
		priority:0,
		link:function(scope,element,attr){
			element.css('display','none');
		}
	};
})
.factory('$reader',function($q){
	return{
		readText:function(strReader){
			var reader = new FileReader();
			var deffered = $q.defer();
			var fileinput = angular.element('[ng-reader="'+strReader+'"]');
			//console.log(fileinput);
			fileinput.trigger('click');
			fileinput.off('change');
			fileinput.on('change',function(){
				//console.log('input changed');
				if(fileinput[0].files.length>0){
					reader.onload = function(e){
						//console.log(e);
						deffered.resolve({data:e.target.result});
					};
					reader.readAsText(fileinput[0].files[0]);	
				}else{
					deffered.reject({statusText:'File is null'});
				}
			});
			return deffered.promise;
		}
	};
});
