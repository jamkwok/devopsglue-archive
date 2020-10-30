function getBlogList() {
                $('#blogs').html('<img class="displayed" src="img/spinner.gif" alt="">');

                $.ajax({
                        url : "prod/readBlogsTable",
                        type: "GET",
                        success: function(data, textStatus, jqXHR)
                        {
                                 //var json = JSON.parse(data);
                                 var html = " ";
                                 var json = data;
                                 var nblog = json["Count"];
                                 json["Items"].sort(predicatBy("date"));
                                 for (i = 0; i < nblog; i++) {
                                        html += '<div class="post-preview">';
                                        html += '<a href="blogs/' + json["Items"][i]["date"]["S"] + '.html">';
                                        html += '<h2 class="post-title">';
                                        html += json["Items"][i]["blogs"]["S"];
                                        html += '</h2>';
                                        html += '<h3 class="post-subtitle">';
                                        html += json["Items"][i]["description"]["S"];
                                        html += '</h3>';
                                        html += '</a>';
                                        html += '<p class="post-meta">Posted by <a href="blogs/' + json["Items"][i]["date"]["S"] + '.html">James Kwok </a>' + json["Items"][i]["datealpha"]["S"] + '</p>';
                                        html += '</div>';
                                        html += '<hr>';
                                }
                                $('#blogs').html(html);

                        },
                        error: function (jqXHR, textStatus, errorThrown)
                        {
                                $('#blogs').html("Damn it's broken!");
                        }
                });
}

function predicatBy(prop){
                return function(a,b){
                        if( a[prop]["S"] > b[prop]["S"]){
                                return -1;
                        }else if( a[prop]["S"] < b[prop]["S"]){
                                return 1;
                        }
                        return 0;
                }
}

function getBlogTitle(blog_date) {
                $('#blogtitle').html('Loading...');

                $.ajax({
                        url : "../prod/readBlogsTable",
                        type: "GET",
                        success: function(data, textStatus, jqXHR)
                        {
                                 //var json = JSON.parse(data);
                                 var html = " ";
                                 var json = data;
                                 var nblog = json["Count"];
                                 json["Items"].sort(predicatBy("date"));

                                 var index = 0;
                                 for (i = 0; i < nblog; i++) {
                                        if ( json["Items"][i]["date"]["S"] == blog_date ) {
                                                index = i;
                                        }
                                 }
                                 html += '<h1>' + json["Items"][index]["blogs"]["S"] + '</h1>';
                                 html += '<h2 class="subheading">' + json["Items"][index]["description"]["S"] + '</h2>';
                                 html += '<span class="meta">Posted by <a href="https://au.linkedin.com/in/jamkwok">James Kwok</a> on ' + json["Items"][index]["datealpha"]["S"] + '</span>';
                                 $('#blogtitle').html(html);

                        },
                        error: function (jqXHR, textStatus, errorThrown)
                        {
                                 $('#blogtitle').html("Damn it's broken!");
                        }
                });
 }
