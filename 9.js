/**********************
 * fordingTheRiver.js *
 **********************
 *
 * And there's the river. Fortunately, I was prepared for this.
 * See the raft on the other side?
 *
 * Everything is going according to plan.
 */

function startLevel(map) {
    var raftDirection = 'down';

    map.placePlayer(map.getWidth()-1, map.getHeight()-1);
    var player = map.getPlayer();

    map.defineObject('raft', {
        'type': 'dynamic',
        'symbol': '▓',
        'color': '#420',
        'transport': true, // (prevents player from drowning in water)
        'behavior': function (me) {
            me.move(raftDirection);
        }
    });

    map.defineObject('water', {
        'symbol': '░',
        'color': '#44f',
        'onCollision': function (player) {
            player.killedBy('drowning in deep dark water');
        }
    });

    for (var x = 0; x < map.getWidth(); x++) {
        for (var y = 5; y < 15; y++) {
            map.placeObject(x, y, 'water');
        }
    }

    map.placeObject(20, 5, 'raft');
    map.placeObject(0, 2, 'exit');
    map.placeObject(0, 1, 'block');
    map.placeObject(1, 1, 'block');
    map.placeObject(0, 3, 'block');
    map.placeObject(1, 3, 'block');

    var x = player.getX();
    player.setPhoneCallback(function () {
        raftDirection = 'up';
    });


}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateExactlyXManyObjects(1, 'raft');
}
 
// when you board the raft for the first time, call the phone once. now the raft will always move with you
// as you move upwards