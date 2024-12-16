# LinkedIn Badge

this is a workaround to constant problems that i've always had with the JS-driven LinkedIn badge generator. two problems in particular:

1.  the badge is throttles and will stop generating if you refresh the page too much, which tends to happens always when i developing something.

2.  the CSS is rigid and usually spills over into the adjacent column, requiring a lot of styling gymnastics to get the page to look "right".

i punted and created this replacement, which works great. it uses the original image assets from the JS-driven badge, but, this version is generated entirely with Bootstrap and uses no special formatting codes at all.
