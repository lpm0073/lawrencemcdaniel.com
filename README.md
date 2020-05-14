# lawrencemcdaniel.com

ReactJS front end for my personal web site.

## Wordpress Integration

https://developer.wordpress.org/rest-api/using-the-rest-api/client-libraries/
https://gist.github.com/verticalgrain/eb694cfbc8ac7da7ae8d876858019921
https://lawrencemcdaniel.com/wp-json/wp/v2



## custom WP content type

./wp-content/plugins/ProfTeamExtensions/ProfTeamExtensions.php:99:register_post_type( 'portfolio', $args );
./wp-content/plugins/ProfTeamExtensions/ProfTeamExtensions.php:150:register_post_type( 'present', $args );
./wp-content/plugins/ProfTeamExtensions/ProfTeamExtensions.php:200:register_post_type( 'education', $args );
./wp-content/plugins/ProfTeamExtensions/ProfTeamExtensions.php:2##49:register_post_type( 'testimonial', $args );
./wp-content/plugins/ProfTeamExtensions/ProfTeamExtensions.php:298:register_post_type( 'packages', $args );
./wp-content/plugins/ProfTeamExtensions/ProfTeamExtensions.php:347:register_post_type( 'process', $args );
./wp-content/plugins/ProfTeamExtensions/ProfTeamExtensions.php:398:register_post_type( 'team', $args );

## Specialties images
https://lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=43&_embed
https://lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=43&_embed&id=2664

https://lawrencemcdaniel.com/wp-json/wp/v2/portfolio
https://lawrencemcdaniel.com/wp-json/wp/v2/media
https://lawrencemcdaniel.com/wp-json/wp/v2/categories


## Deploy to AWS S3
https://medium.com/serverlessguru/deploy-reactjs-app-with-s3-static-hosting-f640cb49d7e6

## Configure Cloudfront
https://stackoverflow.com/questions/46497969/cloudfront-returns-403-forbidden-when-refreshing-page
