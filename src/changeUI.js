const fs = require('fs')
const path = require('path');
const {exec, execSync} = require('child_process');

const spotifyPath = path.join(process.env.APPDATA, '/Spotify');
const prefsPath = path.join(process.env.APPDATA, '/Spotify/prefs')
const exe = path.join(process.env.APPDATA, '/Spotify/Spotify.exe')


module.exports = {
    oldUI: function() {
        try{
            execSync('taskkill /IM "Spotify.exe" /F');

        } catch (err) {
            console.log(err)
        }
        fs.access(prefsPath, function(err) {
            if(err) {
                console.log('Spotify.exe could not be found');
            } else {
                fs.readFile(prefsPath, 'utf8', function(err, data) {
                    if(err){
                        return console.log(err);
                    } else if(data.includes('ui.experience_override="xpui"')){ 
                        var result = data.replace(/ui.experience_override="xpui"/g, 'ui.experience_override="classic"');
                        fs.writeFile(prefsPath, result, 'utf8', function (err){
                            if(err) return console.log(err);
                        });
                        console.log(exe)
                        exec(`cd .. & start ${exe}`)
                        } else {
                        console.log('Creating the interface line');
                        fs.appendFile(prefsPath, 'ui.experience_override="classic"', function (err) {
                        if(err){
                            return console.log(err);
                        }
                        })
                        exec(`cd .. & start ${exe}`);
                    }
                })
            }
        })
    },
    newUI: function() {
        try{
            execSync('taskkill /IM "Spotify.exe" /F');

        } catch (err) {
            console.log(err)
        }
        fs.access(prefsPath, function(err) {
            if(err) {
                console.log('Spotify.exe could not be found');
            } else {
                fs.readFile(prefsPath, 'utf8', function(err, data) {
                    if(err){
                        return console.log(err);
                    } else if(data.includes('ui.experience_override="classic"')){ 
                        var result = data.replace(/ui.experience_override="classic"/g, 'ui.experience_override="xpui"');
                        fs.writeFile(prefsPath, result, 'utf8', function (err){
                            if(err) return console.log(err);
                        })
                        exec(`cd .. & start ${exe}`)
                    } else {
                        console.log('Creating the interface line');
                        fs.appendFile(prefsPath, 'ui.experience_override="xpui"', function (err) {
                            if(err){
                                return console.log(err);
                            }
                            })
                            exec(`cd .. & start ${exe}`);
                    }
                })
            }
        })
    }

}

