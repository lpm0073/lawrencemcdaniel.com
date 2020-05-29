/*
https://bl.ocks.org/veltman/4c989172ac2f820b0b7267c53cb96975
*/
var api = "https://api.lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=43&_embed&per_page=100";
var logos = [];

d3.json(api, function(err, posts) {

  logos = posts.map(function(post) {
    return post._embedded["wp:featuredmedia"][0].source_url;
  });

  d3.shuffle(logos);
  repaint();

});

function random_logo() {
  return logos[Math.floor(Math.random() * logos.length)];
}

/*
  1. Choose a random cube side, choose a random logo, wait for a random time period
  2. swap the background image of the chosen cube side
  3. queue up another repaint()
*/
function repaint() {

  if (logos.length == 0) {
    return false;
  }

  idx = Math.floor(Math.random() * d3.selectAll(".logo").size());
  d3.selectAll(".logo")
    .filter(function(d, i) {return i === idx})
    .each(function() {

      var side = d3.select(this);
      setTimeout(function() {
        side.transition()
            .duration(500)
            .style("opacity", 0);

        side.style("background-image", "url('" + random_logo() + "')");

        side.transition()
            .duration(500)
            .style("opacity", 1);

        repaint();
        }, 3000*Math.random());   


    });

}

