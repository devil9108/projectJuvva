var userController = (function(){

    var player1 = {
        positon : [0,0,0,0,0,0,0,0],
        path : [ 'b05', 'b04', 'b03', 'b02', 'b01', 'b10', 'b19', 'b28', 'b37', 'b46', 'b55', 'b64', 'b73', 'b74', 'b75', 'b76', 'b77', 'b78', 'b79', 'b80', 'b81', 'b72', 'b63', 'b54', 'b45', 'b36', 'b27', 'b18', 'b09', 'b08', 'b07', 'b06', 'b17', 'b26', 'b35', 'b44', 'b53', 'b62', 'b71', 'b70', 'b69', 'b68', 'b67', 'b66', 'b65', 'b56', 'b47', 'b38', 'b29', 'b20', 'b11', 'b12', 'b13', 'b14', 'b15', 'b16', 'b25', 'b34', 'b43', 'b52', 'b61', 'b60', 'b59', 'b58', 'b57', 'b48', 'b39', 'b30', 'b21', 'b22', 'b23', 'b24', 'b33', 'b42', 'b51', 'b50', 'b49', 'b40', 'b31', 'b32', 'b41' ],
        chinnaJuvva : {
            status : false,
            coins : [0,0],
            position : 0,
        },
        pedhaJuvva : {
            status : false,
            coins : [0,0,0,0],
            position : 0
        },
        killChance : 0,
        complete : 0,
        kill : false
    };

    var player2 = {
        positon : [0,0,0,0,0,0,0,0],
        path : [ 'b77', 'b78', 'b79', 'b80', 'b81', 'b72', 'b63', 'b54', 'b45', 'b36', 'b27', 'b18', 'b09', 'b08', 'b07', 'b06', 'b05', 'b04', 'b03', 'b02', 'b01', 'b10', 'b19', 'b28', 'b37', 'b46', 'b55', 'b64', 'b73', 'b74', 'b75', 'b76', 'b65', 'b56', 'b47', 'b38', 'b29', 'b20', 'b11', 'b12', 'b13', 'b14', 'b15', 'b16', 'b17', 'b26', 'b35', 'b44', 'b53', 'b62', 'b71', 'b70', 'b69', 'b68', 'b67', 'b66', 'b57', 'b48', 'b39', 'b30', 'b21', 'b22', 'b23', 'b24', 'b25', 'b34', 'b43', 'b52', 'b61', 'b60', 'b59', 'b58', 'b49', 'b40', 'b31', 'b32', 'b33', 'b42', 'b51', 'b50', 'b41' ],
        chinnaJuvva : {
            status : false,
            coins : [0,0],
            position : 0,
        },
        pedhaJuvva : {
            status : false,
            coins : [0,0,0,0],
            position : 0
        },
        killChance : 0,
        complete : 0,
        kill : false
    };

    return {

        play1 : player1,
        play2 : player2,
    };
})();

var diceController = (function(){

    var i =0, count = [];

    return {

        value : count,
        
        diceRoll : function(player, head, btn){

            var num = Math.floor(Math.random() * 9);

            if((num === 0) || (num === 1)){

                num = Math.floor(Math.random() * 9);

                /*if((num === 0) || (num === 1)){

                    num = Math.floor(Math.random() * 9);   
                }*/
            }

            if(num === 0){
                count[i] = 16;
                num = 16
            }else if(num === 1){
                count[i] = 15;
                num = 15
            }else{
                count[i] = num;
            }
            i++;

            switch(num){
                case 16 : $('.imageDisplay').css("background-image","url(/images/0.png)");
                         break;
                case 15 : $('.imageDisplay').css("background-image","url(/images/1.png)");
                         break;
                case 2 : $('.imageDisplay').css("background-image","url(/images/2.png)");
                         break;
                case 3 : $('.imageDisplay').css("background-image","url(/images/3.png)");
                         break;
                case 4 : $('.imageDisplay').css("background-image","url(/images/4.png)");
                         break;
                case 5 : $('.imageDisplay').css("background-image","url(/images/5.png)");
                         break;
                case 6 : $('.imageDisplay').css("background-image","url(/images/6.png)");
                         break;
                case 7 : $('.imageDisplay').css("background-image","url(/images/7.png)");
                         break;
                case 8 : $('.imageDisplay').css("background-image","url(/images/8.png)");
                         break;
            }
            head.innerHTML = count.join();

            if( num ==15 || num == 16 || num == 4 || num == 6 || num == 8){

                
                return false;
            
            } else {
                $(btn).attr('disabled' , true);
                value = count;
                i = 0, sum = ' ';
                //$('').attr('disabled' , false);
                
            }
            if(player.killChance > 0){

                player.killChance -= 1;

            } 
            diceController.check(player,count);
            return true;
        },

        check : function(player,count){

            var chance = 0, sum = 0;
            var position = player.positon.slice();
            position.sort((a,b) => a-b);
            var minPos = position[0];
            var minPos2 = position[1];
            count.forEach((i) => sum+=i );
            if((minPos + sum) <= 80){
                return;
            }else if(((minPos + sum) > 80) && (count.length > 1) && (minPos2 < 80)){
                var k, l, m, n;
                for(i =0; i < count.length; i++){
                    
                    if((minPos+k) < 80){
                        k += count[i];
                    }else if((minPos2 + l)< 80){
                        l += count[i];
                    }else if((player.chinnaJuvva.position + m/2) <80){
                        m += count[i];
                    }else if((player.pedhaJuvva.position + n/4) < 80){
                        if(i === count.length){
                            return;
                        }
                    }else{
                        count =0;
                        return;
                    }
                    
                }

            }else{
                count =0;
                return;
            }
        }
    }

})();

var UIController = (function(){
    var domElements = {
        btn1 : document.querySelector('#btn1'),
        btn2 : document.querySelector('#btn2'),
        p1h3 : document.querySelector('h3#p1'),
        p2h3 : document.querySelector('h3#p2'),
        p1coins : document.querySelector('.main'),
        
        
    }

    return{

        uiElements : domElements,

        moveCoin : function(player, value, coin, btn , opp, btn1){
    
            $(`.${coin}`).attr('draggable',true);

            var dragged, drop = [], noDrag = 0, diceCount = value, fill = 0, i = 0, parent;

            if(coin === 'coinr'){
                fill = 'fillr';
                pedhaJuvva = 'pedhaJuvvaR';
                chinnaJuvva = 'chinnaJuvvaR';
                oppPJuvva = 'pedhaJuvvaG';
                oppCJuvva = 'chinnaJuvvaG';
                 
            }else if(coin === 'coing'){
                fill = 'fillg';
                pedhaJuvva = 'pedhaJuvvaG';
                chinnaJuvva = 'chinnaJuvvaG';
                oppPJuvva = 'pedhaJuvvaR';
                oppCJuvva = 'chinnaJuvvaR';
            }
            
            domElements.p1coins.ondragstart = function(e){
                dragged = e.target;
                parent = $(e.target).parent();

                setTimeout(()=> e.target.className += ' invisible',0);  
                var dice = 0, k = 0;
                
                if( (player.pedhaJuvva.status === true) && ($(e.target).hasClass(pedhaJuvva))){

                    var id = ($(e.target).attr('id')).substring(1,2);

                    while(k<value.length){

                        var divisible = 0;
                        divisible = diceCount[0];
                        if((divisible % 4) === 0){

                            if(!drop.find(function(item){ if(item === '#'+ (player.path[player.positon[id] + divisible/4])){return true}} )){
                                newPlace = '#' + player.path[player.positon[id] + divisible/4];
                                if(((player.path.indexOf(newPlace.substring(1,4)) >= 56) && (player.path.indexOf(newPlace.substring(1,4)) < 72) && ($(newPlace).children().length === 0)) || ($(newPlace).hasClass('safe')) || (player.path.indexOf(newPlace.substring(1,4)) >= 72)){
                                    drop.push(newPlace);
                                    $(newPlace).addClass( fill);
                                }
                            }
                        }
                        for(var j = 1; j< diceCount.length; j++){

                            divisible += diceCount[j];
                            if(divisible % 4 === 0){
                             
                                if(!drop.find(function(item){ if(item === '#' + (player.path[player.positon[id] + divisible/4])){return true}} )){
                                    newPlace = '#' + player.path[player.positon[id] + divisible/4];
                                    if(((player.path.indexOf(newPlace.substring(1,4)) >= 56) && (player.path.indexOf(newPlace.substring(1,4)) < 72) && ($(newPlace).children().length ===0)) || ($(newPlace).hasClass('safe')) || (player.path.indexOf(newPlace.substring(1,4)) >= 72)){
                                        drop.push(newPlace);
                                        $(newPlace).addClass( fill);
                                    }
                                }

                            }
                        }
                        k++;
                        var d = diceCount.shift();
                        diceCount.push(d);
                    }
                    
                }else if( (player.chinnaJuvva.status === true) && ($(e.target).hasClass(chinnaJuvva))){

                    var id = ($(e.target).attr('id')).substring(1,2);

                    while(k<value.length){

                        var divisible = 0;
                        divisible = diceCount[0];
                        if((divisible % 2) === 0){

                            if(!drop.find(function(item){ if(item === '#'+ (player.path[player.positon[id] + divisible/2])){return true}} )){
                                newPlace = '#' + player.path[player.positon[id] + divisible/2];
                                if(((player.positon[id]+divisible/2) <= player.pedhaJuvva.position) && (($(newPlace).hasClass('safe') || $(newPlace).children().hasClass(coin)) && ((player.positon[id]+divisible/2)<72)) ){
                                    drop.push(newPlace);
                                    $(newPlace).addClass( fill);
                                }else if( ((player.positon[id]+divisible/2) <= player.pedhaJuvva.position) &&(($(newPlace).hasClass('safe') || !$(newPlace).children().hasClass(coin)) && ((player.positon[id]+divisible/2)>71)) ){
                                    drop.push(newPlace);
                                    $(newPlace).addClass( fill);
                                }
                            }
                        }
                        for(var j = 1; j< diceCount.length; j++){

                            divisible += diceCount[j];
                            if(divisible % 2 === 0){
                             
                                if(!drop.find(function(item){ if(item === '#'+ (player.path[player.positon[id] + divisible/2])){return true}} )){
                                    newPlace = '#' + player.path[player.positon[id] + divisible/2];
                                    if(((player.positon[id]+divisible/2) <= player.pedhaJuvva.position) && (($(newPlace).hasClass('safe') || $(newPlace).children().hasClass(coin)) && ((player.positon[id]+divisible/2)<72)) ){
                                        drop.push(newPlace);
                                        $(newPlace).addClass( fill);
                                    }else if( ((player.positon[id]+divisible/2) <= player.pedhaJuvva.position) &&(($(newPlace).hasClass('safe') || !$(newPlace).children().hasClass(coin)) && ((player.positon[id]+divisible/2)>71)) ){
                                        drop.push(newPlace);
                                        $(newPlace).addClass( fill);
                                    }
                                }

                            }
                        }
                        k++;
                        var d = diceCount.shift();
                        diceCount.push(d);
                    }
                
                }else if($(e.target).hasClass(coin)){

                    for( var j =0 ; j < diceCount.length; j++){
                        var id = ($(e.target).attr('id')).substring(1,2);
                        var newPlace = '#' + player.path[player.positon[id] + diceCount[j]];
                        if((($(newPlace).children().length === 0) || !($(newPlace).children().hasClass(coin)) || ($(newPlace).hasClass('safe'))) && ((player.kill === true) || (player.path.indexOf(newPlace.substring(1,4)) <= 31) ) && ((player.path.indexOf(newPlace.substring(1,4)) <= 56) || ((player.path.indexOf(newPlace.substring(1,4)) <= player.chinnaJuvva.position) && (player.chinnaJuvva.status === true) ))){
                        
                            drop[j] = newPlace;
                        
                        }else if( (player.path.indexOf(newPlace.substring(1,4)) >= 56) && (player.path.indexOf(newPlace.substring(1,4)) < 72) && $(newPlace).children().hasClass(coin) && ((player.path.indexOf(newPlace.substring(1,4)) <= player.chinnaJuvva.position) || (player.chinnaJuvva.status === true))){

                            drop[j] = newPlace;
                        }
                        
                        $(drop[j]).addClass( fill);  
                    }

                }
                if(drop.length === 0){
                    noDrag += 1;
                    if(noDrag === (8-player.complete)){
                        console.log('hi');
                    }
                }

                
            };

            domElements.p1coins.ondragend =  function(e){
                
                e.preventDefault();
                if($(e.target).hasClass(pedhaJuvva)){
                    e.target.className = coin + ' ' + pedhaJuvva;
                }else if($(e.target).hasClass(chinnaJuvva)){
                    e.target.className = coin + ' ' + chinnaJuvva;
                }else  if($(e.target).hasClass(coin)){
                    e.target.className = coin;
                }else {
                    $(e.target).removeClass('invisible');
                }
                if($(e.target).parent().hasClass('safe') && ($(e.target).parent().children().length>1)){
                    e.target.className += ' half';
                }
            };

            domElements.p1coins.ondragover = function(e){
                e.preventDefault();
            };

            domElements.p1coins.ondrop = function(e){
                e.preventDefault();
                drop.forEach((newPlace) => $(newPlace).removeClass( fill));
            
                var j = '#' + $(e.target).attr('id');
                var l = '#' + $(e.target).parent().attr('id');
                var k = drop.find(function(i){
                    if((i == j) || (i == l)){
                        return i;
                    }
                });
                if((j === k) || (l === k)){

                    if($(parent).children().hasClass(oppPJuvva) && $(dragged).hasClass(pedhaJuvva)){

                        UIController.killJuvva(parent,opp,coin,player);
                    }
                    if($(parent).children().hasClass(oppCJuvva) && $(dragged).hasClass(chinnaJuvva)){

                        UIController.killJuvva(parent,opp,coin,player);
                    }

                    this.diceCount = UIController.move(k,dragged,player,diceCount,coin,opp,btn,btn1);
                    value = diceCount;
                    drop =[];
                    
                    
                }     
            }
        },

        move : function(end,dragged,player,value,coin,opp,btn,btn1){

            $(end).append(dragged);
            
            var id = end.substring(1,4);
            var pos = player.path.indexOf(id);
            var c = ($(dragged).attr('id')).substring(1,2);
            var prevpos = player.positon[c];
            player.positon[c] = pos;
            var filtered = value;
            if(coin === 'coinr'){
                var pedhaJuvva = 'pedhaJuvvaR';
                var chinnaJuvva = 'chinnaJuvvaR';
                var head = domElements.p1h3;
            }else if(coin === 'coing'){
                var pedhaJuvva = 'pedhaJuvvaG';
                var chinnaJuvva = 'chinnaJuvvaG';
                var head = domElements.p2h3;
            }
            if($(dragged).hasClass(pedhaJuvva)){

                var dice = 0, k=0;
                player.pedhaJuvva.position = pos;
                player.pedhaJuvva.coins.forEach(function(coin){
                    var id = coin.substring(1,2);
                    player.position[id] = pos;
                });

                while(k<value.length){
                    var divisible=0;
                    var path =[];
                    divisible = value[0];
                    path.push(divisible);
                    if(divisible%4 === 0){
                        if(divisible/4 === (pos-prevpos)){
                            var path2 = path;
                            break;
                        }
                    }
                    for(var j=1;j<value.length;j++){
                        divisible+=value[j];
                        path.push(value[j]);
                        if(divisible%4 === 0){
                            if(divisible/4 === (pos-prevpos)){
                                var path2 = path;
                                break;
                            }
                        }
                    }
                    k++;
                    var d = value.shift();
                    value.push(d);
                }
                path2.forEach(function(val){
                    var foundIndex = value.indexOf(val);
                    if(foundIndex != -1){
                      value.splice(foundIndex, 1);
                    }
                });

            } else if($(dragged).hasClass(chinnaJuvva)){

                var dice = 0, k=0;
                player.chinnaJuvva.position = pos;

                while(k<value.length){
                    var divisible=0;
                    var path =[];
                    divisible = value[0];
                    path.push(divisible);
                    if(divisible%2 === 0){
                        if(divisible/2 === (pos-prevpos)){
                            var path2 = path;
                            break;
                        }
                    }
                    for(var j=1;j<value.length;j++){
                        divisible+=value[j];
                        path.push(value[j]);
                        if(divisible%2 === 0){
                            if(divisible/2 === (pos-prevpos)){
                                var path2 = path;
                                break;
                            }
                        }
                    }
                    k++;
                    var d = value.shift();
                    value.push(d);
                }
                path2.forEach(function(val){
                    var foundIndex = value.indexOf(val);
                    if(foundIndex != -1){
                      value.splice(foundIndex, 1);
                    }
                });

            }else{

                for(var i of filtered){
                    var filter = value.shift();
                    if(filter != Math.abs(pos-prevpos)){
                        value.push(filter);
                    }else break;
                }

            }
            UIController.killRparentcheck(end,opp,coin,player);
            if(player.positon[c] === (player.path.length-1)){

                player.positon[c] += 1;
                if($(end).children().hasClass(pedhaJuvva)){
                    player.complete += 4;
                    $(end).children().remove();
                }else if($(end).children().hasClass(chinnaJuvva)){
                    player.complete += 2;
                    $(end).children().remove();
                }else{
                    player.complete += 1;
                    $(end).children().remove();
                }
                if(player.complete === 8){
                    alert("Game Completed");
                }

            }
            if(value.length){

                head.innerHTML = value.join();
                UIController.moveCoin(player,value,coin,btn,opp,btn1);
            }else if(player.killChance > 0){

                $(btn1).attr('disabled' , false);

            } else {

                setTimeout( () => {$(btn).attr('disabled',false); $(`.${coin}`).attr('draggable',false);},0);
                domElements.p1coins.ondragstart = function(){
                    return false;
                }
                
                
            }
            return value;
        },

        killRparentcheck : function(end,opp,coin ,player){

            var childs = $(end).children();
            
            var id3 = $(end).attr('id');
            if(coin === 'coinr'){
                var pedhaJuvva = 'pedhaJuvvaR';
                var chinnaJuvva = 'chinnaJuvvaR';
                var oppPJuvva = 'pedhaJuvvaG';
                var oppCJuvva = 'chinnaJuvvaG';
            }else if(coin === 'coing'){
                var pedhaJuvva = 'pedhaJuvvaG';
                var chinnaJuvva = 'chinnaJuvvaG';
                var oppPJuvva = 'pedhaJuvvaR';
                var oppCJuvva = 'chinnaJuvvaR';
            }
            if($(end).hasClass('safe') && (childs.length>1)){
                setTimeout(()=> $(end).children().addClass('half'),0);
            } else if( (childs.length>1) &&  (player.path.indexOf(id3) >= 56) && (player.path.indexOf(id3) < 72) && ($(end).children().hasClass(coin))){

                setTimeout(()=> $(end).children().addClass('half'),0);

            }else if(!($(end).hasClass('safe')) && (childs.length>1) && (player.path.indexOf(id3) > 71) && ($(end).children().hasClass(oppPJuvva) || $(end).children().hasClass(oppCJuvva))){

                if($(end).children().hasClass(pedhaJuvva) && $(end).children().hasClass(oppPJuvva)){
                    setTimeout(()=> $(end).children().addClass('half'),0);
                }else if($(end).children().hasClass(pedhaJuvva) && $(end).children().hasClass(oppCJuvva)){

                    UIController.killJuvva(end,opp,coin,player);
                }else if($(end).children().hasClass(chinnaJuvva) && $(end).children().hasClass(oppCJuvva)){
                    setTimeout(()=> $(end).children().addClass('half'),0);                    
                }
            
            }else if( !($(end).hasClass('safe')) && (childs.length>1)){

                var id2 = ($(childs[0]).attr('id')).substring(1,2);
                if(coin == 'coinr'){
                    var target = 'g'+id2;
                    var mv = $(end).children('.coing');
                    $(mv).attr('draggable',false);
                    setTimeout( () => $(`#${target}`).append(mv),0);
                    opp.positon[id2] = 0;
                    player.killChance += 1;
                    player.kill = true;

                }else if(coin == 'coing'){

                    var target = 'r'+id2;
                    var mv = $(end).children('.coinr');
                    $(mv).attr('draggable',false);
                    setTimeout( () => $(`#${target}`).append(mv),0);
                    opp.positon[id2] = 0;
                    player.killChance += 1;
                    player.kill = true;
                }

            } 

            if((childs.length >= 4) && (player.path.indexOf(id3) == 56) && (player.pedhaJuvva.status === false)){

                var childs = $(end).children(`.${coin}`);
                player.pedhaJuvva.status = true;
                
                for(i=0; i<childs.length;i++){

                    player.pedhaJuvva.coins[i] = $(childs[i]).attr('id');

                }
                if(coin == 'coinr'){

                    setTimeout( () => $(childs[0]).addClass('pedhaJuvvaR'),0);
                    player.pedhaJuvva.position = id3;

                    for(i =1; i<childs.length; i++){

                        $(childs[i]).remove();

                    }

                }else if(coin == 'coing'){
                    
                    setTimeout( () => $(childs[0]).addClass('pedhaJuvvaG'),0);
                    player.pedhaJuvva.position = id3;

                    for(i =1; i<childs.length; i++){

                        $(childs[i]).remove();

                    }

                }
                if($(end).children() === 1){
                    $(childs[0]).removeClass('half');
                }

            }else if((((childs.length >= 2) && !$(end).children().hasClass(pedhaJuvva)) || (childs.length >=3)) && (player.path.indexOf(id3) == 56) && (player.pedhaJuvva.status === true) && (player.chinnaJuvva.status === false) ){

                var childs = $(end).children(`.${coin}`);
                player.chinnaJuvva.status = true;
                $(end).children().removeClass('half');
                var p =[];
                if($(end).children().hasClass(pedhaJuvva) && childs.length >=2){
                    var k =1;
                }else{
                    var k = 0;
                }
                for(i=0; i<(childs.length-k);i++){
                    
                    player.chinnaJuvva.coins[i] = $(childs[k+i]).attr('id');
                    p.push(i);
                    
                }
                if(coin == 'coinr'){

                    setTimeout( () => $(childs[k]).addClass('chinnaJuvvaR'),0);
                    
                    player.chinnaJuvva.position = id3;

                    for(i =k+1; i<childs.length; i++){

                        $(childs[i]).remove();

                    }

                }else if(coin == 'coing'){
                    
                    setTimeout( () => $(childs[k]).addClass('chinnaJuvvaG'),0);
                    player.chinnaJuvva.position = id3;

                    for(i =k+1; i<childs.length; i++){

                        $(childs[i]).remove();

                    }

                }

            }
        },

        killJuvva : function(end,opp,coin,player){

            if(coin === 'coinr'){
                var pedhaJuvva = 'pedhaJuvvaR';
                var chinnaJuvva = 'chinnaJuvvaR';
                var oppPJuvva = 'pedhaJuvvaG';
                var oppCJuvva = 'chinnaJuvvaG';
                var oppID = 'g';
                var oppCoin = 'coing';
            }else if(coin === 'coing'){
                var pedhaJuvva = 'pedhaJuvvaG';
                var chinnaJuvva = 'chinnaJuvvaG';
                var oppPJuvva = 'pedhaJuvvaR';
                var oppCJuvva = 'chinnaJuvvaR';
                var oppID ='r';
                var oppCoin = 'coinr'
            }

            if($(end).children().hasClass(oppCJuvva)){

                opp.chinnaJuvva.status = false;
                opp.chinnaJuvva.coins.forEach(function(coinid){

                    var id = coinid.substring(1,2);
                    var desId = '#'+oppID + id;
                    var node = '<div class="'+oppCoin+'" id="'+coinid+'" draggable="false"></div>';
                    $(desId).append(node);
                    opp.positon[id] = 0;
                });
                opp.chinnaJuvva.coins = [0,0];
                opp.chinnaJuvva.position = 0;
                
                $(end).children().remove(`.${oppCJuvva}`);
                player.killChance +=1;

            }
            if($(end).children().hasClass(oppPJuvva)){

                opp.pedhaJuvva.status = false;
                opp.pedhaJuvva.coins.forEach(function(coinid){
                    
                    var id = coinid.substring(1,2);
                    var desId = '#' + oppID + id;
                    var node = '<div class="'+oppCoin+'" id="'+coinid+'" draggable="false"></div>';
                    $(desId).append(node);
                    opp.positon[id] = 0;
                });
                opp.pedhaJuvva.coins = [0,0];
                opp.pedhaJuvva.position = 0;
                
                $(end).children().remove(`.${oppPJuvva}`);
                player.killChance+=1;

            }


        },


    };
})();


var controller = (function(diceCntrl,uiCntrl,userCntrl){

    var uiEle = uiCntrl.uiElements;


    uiEle.btn1.addEventListener('click', function(){

        var status = diceCntrl.diceRoll(userCntrl.play1,uiEle.p1h3,uiEle.btn1);       
        if(diceCntrl.value && status){
            uiCntrl.moveCoin(userCntrl.play1,diceCntrl.value, 'coinr',uiEle.btn2, userCntrl.play2, uiEle.btn1);   
        }
        
    });

    uiEle.btn2.addEventListener('click', function(){
        
        var status = diceCntrl.diceRoll(userCntrl.play2, uiEle.p2h3, uiEle.btn2);
        if(diceCntrl.value && status){
            uiCntrl.moveCoin(userCntrl.play2,diceCntrl.value, 'coing',uiEle.btn1, userCntrl.play1,uiEle.btn2);   
        }
    })


})(diceController, UIController, userController);