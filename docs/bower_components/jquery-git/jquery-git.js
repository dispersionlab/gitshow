(function() {
    'use strict';

    var d = document;

    $.fn.git = function(options) {

        // Without a username, cannot lookup repos
        var me = this,
            opts = typeof options !== 'object' ? {} : options,
            username = opts.username,
            data = opts.data || 'repos',
            uri = [
                'https://api.github.com/users',
                username,
                data
            ].join('/'),
            exclude = opts.exclude || [],
            include = opts.include || [],
            limit = !isNaN(opts.limit) ? opts.limit : undefined,
            err;

        if (!username) {
            throw new Error('$.git: Cannot get information without a username');
        }

        // Add an error message to the div
        err = $(
            '<div class="jquery-git-error">No GitHub repos found for ' +
            username + '</div>'
        );
        me.append(err);

        // Get the repositories
        $.getJSON(uri, function(data) {


            if (data && data.length) {
                err.remove();
                var html = '',
                    dataLengthLimited = false;

                // Check to see if a limit has been set
                if (limit && data.length > limit) {
                    data = data.slice(0, limit);
                    dataLengthLimited = true;
                }

                $(data).each(function(i, v) {
                    let r = /\d/.test((/.$/).exec(v.name))
                    let num = (/.$/).exec(v.name)
                    // filter out non-gitshow repos and the main gitshow admin repo
                    switch(r){
                        case true:
                            
                            fetch(v.url +'/commits')
                            .then(
                                function(response) {
                                if (response.status !== 200) {
                                    console.log('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                    return;
                                }

                                // Examine the text in the response
                                response.json().then(function(data) {
                                    

                                    for(i = 0; i < data.length; i++){
                                        // console.log(data[i].commit.author.name, data[i].commit.author.date, data[i].commit.message, data[i].html_url);

                                        html = '<br>' + data[i].commit.author.name + '<br>' + data[i].commit.author.date + '<br>' + data[i].commit.message + '<br><a class="jquery-git-repo-link" href="' +
                                        data[i].html_url + '" target="_blank">Changes</div><br><a href="' + v.url + '/zipball/' + data[i].sha + '" target="_blank"><u><b>Download</u></b><p>'
                                        var $toProcess = $( html );


                                        // FWIW YOU could also make a button to download a 
                                        // $toProcess.find( "div" ).addClass( "processed" );
                
                                        // getting by id before insertion
                                        // alert( $toProcess.find( "#myDiv1" ).html() );
                                        // alert( $( "#myDiv1" ).html() ); // this will return null, since the divs 
                                                                        // were not yet added to the document
                
                                        $toProcess.appendTo( "#details" + num );
                                    }
                                });
                                }
                            )
                            .catch(function(err) {
                                console.log('Fetch Error :-S', err);
                            });
                            // console.log(v)
                        

                        $('#gitshow' + num).repo({ user: 'dispersionlab', name: 'gitshow'  + num })
                            
                        /*
                        html = '<a class="jquery-git-repo-link" href="' +
                        v.html_url + '" target="_blank">' +
                            (
                                exclude.indexOf('name') > -1 ?
                                    '' : '<h3>' + v.name + '</h3>'
                            ) +
                            (
                                exclude.indexOf('updatedAt') > -1 ?
                                    '' : '<i>Last Updated: ' + [
                                        date.getMonth() + 1,
                                        date.getDate(),
                                        date.getFullYear()
                                    ].join('/') + ' ' + [
                                        date.getHours() > 12 ?
                                            date.getHours() - 12 : date.getHours(),
                                        date.getMinutes()
                                    ].join(':') +
                                    (date.getHours() > 12 ? 'PM' : 'AM') +
                                    '</i>'
                            ) +
                            (
                                v.description && exclude.indexOf('description') > -1 ?
                                    '' : '<div>' + v.description + '</div>'
                            );
                        $(include).each(function(i, w) {
                            html += '<span>' + (v[ w ] || '') + '</span>';
                        });
                        html += '</a>';

                        // console.log(v.name, update)
                        */


                        // ('#details1').append(html)
                        break;


                        case false:


                        break;


                    }

                });

                if (dataLengthLimited) {
                    html += '<a class="jquery-git-owner-link" href="' +
                    data[ 0 ].owner.html_url + '" target="_blank">' + (
                        opts.limitText || 'See More Here!'
                    ) +'</a>';
                }

                // me.append(html);
                
                $("[data-repo]").github();
            }
        }).error(function() {
            console.warn(
                '$.git: Repositories cannot be fetched while not connected to the internet.'
            );
        });

        return this;
    };
})();