//==================== Game Script ======================//
// Credit to IGLOO?, NEXI, KING BOWSER, and CHARM?


//====================JS FROM THE GREY MOD====================//

// Initialize custom settings when application loads
pc.Application.getApplication().once("postrender", function () {
    
    // Override setHeroSkin function for custom character effects
    pc.app.scripts.list()[11].prototype.setHeroSkin = function(){
        var self = this;
        var skinName = this.heroSkin;

        if(this.heroSkin == 'Default'){
            skinName = this.hero + '-' + this.heroSkin + '.jpg';
        }

        if(skinName && this.characterEntity){
            if(skinName.search('Model-') > -1 || skinName.search('.glb') > -1){
                var assetID = this.app.assets.find(skinName).id;
                this.characterEntity.model.asset = assetID;

                var asset = this.app.assets.get(assetID);
                asset.ready(function(){
                    self.handEntity = self.characterEntity.findByName(self.handEntityName);
                    self.weaponHolder.reparent(self.handEntity);
                    console.log('Loaded model skin ' + self.username);
                });
            }else{
                var material = this.characterEntity.model.material.clone();
                var texture = pc.app.assets.find(this.hero + '-' + this.heroSkin + '.jpg');
                var meshInstances = this.characterEntity.model.meshInstances;

                if(meshInstances && meshInstances.length > 0){
                    for (var i = 0; i < meshInstances.length; ++i) {
                        var mesh = meshInstances[i];
                        mesh.material = material;

                        // Add bright white emission effect
                        material.emissive = new pc.Color(1, 1, 1);
                        material.emissiveIntensity = 10000;
                        material.update();
                    }

                    if(texture){
                        material.diffuseMap = texture.resource;
                        material.update();
                    }
                }
                this.weaponHolder.reparent(this.handEntity);
            }
            this.characterEntity.animation.play('Idle');
        }else{
            this.weaponHolder.reparent(this.handEntity);
        }
    };

    // Override createPlayer function
    pc.app.scripts.list()[9].prototype.createPlayer = function(data){
        var player = this.enemyEntity.clone();
        player.enabled = true;
        player.script.enemy.playerId = data.playerId;
        player.script.enemy.username = data.username;
        player.script.enemy.team = data.team;
        player.script.enemy.level = data.level;
        player.script.enemy.group = data.group;

        player.script.enemy.skin = data.skin;
        player.script.enemy.heroSkin = data.heroSkin;

        player.script.enemy.setUsername(data.username, data.team, data.level);
        player.script.enemy.killMessage = data.killMessage;

        // Set weapon
        player.script.enemy.weaponSkins = data.weaponSkins;
        player.script.enemy.setWeapon(data.weapon);
        player.script.enemy.setCharacterSkin(data.skin, 'Default', data.dance);

        this.playerHolder.addChild(player);
        this.players.push(player);
    };
});

// Handle player join events with special Shin character effects
pc.app.on("Game:PlayerJoin", (state) => {
    var shinTexture = pc.app.assets.find('Shin-Default.jpg');
    if (state) {
        for (let i = 2; i <= pc.app.root.findByName("Game").findByName("PlayerHolder").children.length - 1; i++) {
            let player = pc.app.root.findByName('PlayerHolder').children[i];
            if(player.script.enemy.skin != 'Shin'){
                player.script.enemy.setCharacterSkin(player.script.enemy.skin, "Default", player.script.enemy.danceName);
            }else{
                let shinMaterial = player.findByName('ModelHolder').findByName('Shin').model.meshInstances[0].material;
                shinMaterial.diffuse = shinTexture.resource;
                shinMaterial.emissive = new pc.Color(1, 1, 1);
                shinMaterial.emissiveIntensity = 10000;
                shinMaterial.update();
            }
        }
    }
});


pc.app.on("Player:Leave", () => {
    setTimeout(() => {
        document.querySelectorAll('.options a')[3].click();
    }, 1500);
});

// Main overlay and map customization when map loads
pc.app.on("Map:Loaded", () => {
    setTimeout(() => {
        // UI Element positioning and visibility changes
        pc.app.root.findByName("Overlay").findByName("Announce").setLocalPosition(0, -530, 0);

        // Disable achievement notifications
        for(let i = 0; i < 8; i++) {
            pc.app.root.findByName("Achievement").children[i].enabled = false;
        }

        // Hide various UI elements
        pc.app.root.findByName("Container").element.opacity = 0;
        
        // Disable task elements
        for(let i = 0; i < 7; i++) {
            pc.app.root.findByName("Task").children[i].enabled = false;
        }
        pc.app.root.findByName("Task").enabled = false;
        
        // Hide subtitle and quest messages
       // pc.app.root.findByName("Overlay").findByName("Subtitle").enabled = false;
       // pc.app.root.findByName("Overlay").findByName("QuestMessage").element.opacity = 0;
       // pc.app.root.findByName("Overlay").findByName("QuestMessage").findByName("Icon").element.opacity = 0;
       // pc.app.root.findByName("Overlay").findByName("QuestMessage").findByName("Text").element.opacity = 0;

        // Hide weapon ability binds and backgrounds
        pc.app.root.findByName("Overlay").findByName("Weapons").findByName("AbilityGroup").findByName("AbilityBind").enabled = false;
        pc.app.root.findByName("Overlay").findByName("TimesAndScore").findByName("Background").enabled = false;
        pc.app.root.findByName("BarBackground").enabled = false;

        // Hide banners and ads
        pc.app.root.findByName("Overlay").findByName("728x90-Banner").element.opacity = 0;
        pc.app.root.findByName("Overlay").findByName("728x90-Banner").children[0].element.opacity = 0;

        // Hide objectives
       // pc.app.root.findByName("Overlay").findByName("ObjectiveHolder").findByName("Objective").enabled = false;
       // pc.app.root.findByName("Overlay").findByName("TimesAndScore").findByName("ObjectiveTime").enabled = false;

        // Position health UI
        pc.app.root.findByName("Overlay").findByName("Health").setLocalPosition(30, 10, 0);

        // Hide reminder and countdown elements
        pc.app.root.findByName("Overlay").findByName("Reminder").enabled = false;
        pc.app.root.findByName("Overlay").findByName("CountBack").enabled = false;

        // Disable specific overlay children by index
        [30, 31, 32, 33, 48].forEach(index => {
            pc.app.root.findByName("Overlay").children[index].enabled = false;
        });

        // Position score and leaderboard
        pc.app.root.findByName("Overlay").findByName("TimesAndScore").setLocalPosition(530, 0, 0);
        pc.app.root.findByName("Overlay").findByName("Leaderboard").setLocalPosition(30, -30, 0);

        // Hide weapon displays
        pc.app.root.findByName("Overlay").findByName("Weapon").enabled = false;
        pc.app.root.findByName("Overlay").findByName("Weapons").enabled = false;

        // Position and style stats
        pc.app.root.findByName("Stats").setLocalPosition(590, -0.93, 0);
        pc.app.root.findByName("Stats").element.fontSize = 16;

        // Make leaderboard transparent
        pc.app.on("Overlay:Leaderboard", () => {
            try {
                for (let i = 0; i < pc.app.root.findByName("Overlay").findByName("Leaderboard").children.length; i++) {
                    pc.app.root.findByName("Overlay").findByName("Leaderboard").children[i].element.opacity = 0.0;
                }
            } catch (error) { }
        });
        
    }, 2000);

    // Map-specific lighting and visual adjustments
    setTimeout(() => {
        if (pc.currentMap == "Sierra") {
            pc.app.renderer.scene.exposure = 1;
            pc.app.renderer.scene.skyboxIntensity = 10;
            pc.app.root.findByName("Light").light.color = { r: 2.5, g: 2.5, b: 2.5, a: 2.5 };
        }
        
        if (pc.currentMap == "Mistle") {
            pc.app.renderer.scene.exposure = 1;
            pc.app.renderer.scene.skyboxIntensity = 10;
            pc.app.root.findByName("Light").light.color = { r: 3, g: 3, b: 3, a: 3 };
        }
        
        if (pc.currentMap == "Xibalba") {
            pc.app.renderer.scene.exposure = 1;
            pc.app.renderer.scene.skyboxIntensity = 10;
            pc.app.root.findByName("Light").light.color = { r: 3, g: 3, b: 2, a: 1 };
        }
        
        if (pc.currentMap == "Tundra") {
            pc.app.renderer.scene.exposure = 1;
            pc.app.renderer.scene.skyboxIntensity = 10;
            pc.app.root.findByName("Light").light.color = { r: 3, g: 3, b: 2, a: 1 };
        }
    }, 2000);
});