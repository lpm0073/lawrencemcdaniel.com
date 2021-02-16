export const gsdHowToInstallOpenEdx = {
    "@context": "http://schema.org",
    "@type": "HowTo",
    "name": "How to tile a kitchen backsplash",
    "description": "Any kitchen can be much more vibrant with a great tile backsplash. This guide will help you install one with beautiful results, like our example kitchen seen here.",
    "image": {
      "@type": "ImageObject",
      "url": "https://example.com/photos/1x1/photo.jpg",
      "height": "406",
      "width": "305"
    },
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "100"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "tiles"
      }, {
        "@type": "HowToSupply",
        "name": "thin-set mortar"
      }, {
        "@type": "HowToSupply",
        "name": "tile grout"
      }, {
        "@type": "HowToSupply",
        "name": "grout sealer"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "notched trowel"
      }, {
        "@type": "HowToTool",
        "name": "bucket"
      },{
        "@type": "HowToTool",
        "name": "large sponge"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "url": "https://example.com/kitchen#step1",
        "name": "Prepare the surfaces",
        "itemListElement": [{
          "@type": "HowToDirection",
          "text": "Turn off the power to the kitchen and then remove everything that is on the wall, such as outlet covers, switchplates, and any other item in the area that is to be tiled."
        }, {
          "@type": "HowToDirection",
          "text": "Then clean the surface thoroughly to remove any grease or other debris and tape off the area."
        }],
        "image": {
          "@type": "ImageObject",
          "url": "https://example.com/photos/1x1/photo-step1.jpg",
          "height": "406",
          "width": "305"
        }
      }, {
        "@type": "HowToStep",
        "name": "Plan your layout",
        "url": "https://example.com/kitchen#step2",
        "itemListElement": [{
          "@type": "HowToTip",
          "text": "The creases created up until this point will be guiding lines for creating the four walls of your planter box."
        }, {
          "@type": "HowToDirection",
          "text": "Lift one side at a 90-degree angle, and fold it in place so that the point on the paper matches the other two points already in the center."
        }, {
          "@type": "HowToDirection",
          "text": "Repeat on the other side."
        }],
        "image": {
          "@type": "ImageObject",
          "url": "https://example.com/photos/1x1/photo-step2.jpg",
          "height": "406",
          "width": "305"
        }
      }, {
        "@type": "HowToStep",
        "name": "Prepare your and apply mortar (or choose adhesive tile)",
        "url": "https://example.com/kitchen#step3",
        "itemListElement": [{
          "@type": "HowToDirection",
          "text": "Follow the instructions on your thin-set mortar to determine the right amount of water to fill in your bucket. Once done, add the powder gradually and make sure it is thoroughly mixed."
        }, {
          "@type": "HowToDirection",
          "text": "Once mixed, let it stand for a few minutes before mixing it again. This time do not add more water. Double check your thin-set mortar instructions to make sure the consistency is right."
        }, {
          "@type": "HowToDirection",
          "text": "Spread the mortar on a small section of the wall with a trowel."
        }, {
          "@type": "HowToTip",
          "text": "Thinset and other adhesives set quickly so make sure to work in a small area."
        }, {
          "@type": "HowToDirection",
          "text": "Once it's applied, comb over it with a notched trowel."
        }],
        "image": {
          "@type": "ImageObject",
          "url": "https://example.com/photos/1x1/photo-step3.jpg",
          "height": "406",
          "width": "305"
        }
      }, {
        "@type": "HowToStep",
        "name": "Add your tile to the wall",
        "url": "https://example.com/kitchen#step4",
        "itemListElement": [{
          "@type": "HowToDirection",
          "text": "Place the tile sheets along the wall, making sure to add spacers so the tiles remain lined up."
        }, {
          "@type": "HowToDirection",
          "text": "Press the first piece of tile into the wall with a little twist, leaving a small (usually one-eight inch) gap at the countertop to account for expansion. use a rubber float to press the tile and ensure it sets in the adhesive."
        }, {
          "@type": "HowToDirection",
          "text": "Repeat the mortar and tiling until your wall is completely tiled, Working in small sections."
        }],
        "image": {
          "@type": "ImageObject",
          "url": "https://example.com/photos/1x1/photo-step4.jpg",
          "height": "406",
          "width": "305"
        }
      }, {
        "@type": "HowToStep",
        "name": "Apply the grout",
        "url": "https://example.com/kitchen#step5",
        "itemListElement": [{
          "@type": "HowToDirection",
          "text": "Allow the thin-set mortar to set. This usually takes about 12 hours. Don't mix the grout before the mortar is set, because you don't want the grout to dry out!"
        }, {
          "@type": "HowToDirection",
          "text": "To apply, cover the area thoroughly with grout and make sure you fill all the joints by spreading it across the tiles vertically, horizontally, and diagonally. Then fill any remaining voids with grout."
        }, {
          "@type": "HowToDirection",
          "text": "Then, with a moist sponge, sponge away the excess grout and then wipe clean with a towel. For easier maintenance in the future, think about applying a grout sealer."
        }],
        "image": {
          "@type": "ImageObject",
          "url": "https://example.com/photos/1x1/photo-step5.jpg",
          "height": "406",
          "width": "305"
        }
      }
    ],
    "totalTime": "P2D"
}