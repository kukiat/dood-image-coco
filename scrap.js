const axios = require('axios')
const fs = require('fs')
const bed = require('./imageId/bed')

const findCategory = (category) => {
  const categorys = {
    'toilet': 70, 'teddy bear': 88, 'cup': 47, 'bicycle': 2, 'kite': 38, 
    'carrot': 57, 'stop sign': 13, 'tennis racket': 43, 'donut': 60, 'snowboard': 36, 
    'sandwich': 54, 'motorcycle': 4, 'oven': 79, 'keyboard': 76, 'scissors': 87, 'airplane': 5, 
    'couch': 63, 'mouse': 74, 'fire hydrant': 11, 'boat': 9, 'apple': 53, 'sheep': 20, 'horse': 19, 
    'banana': 52, 'baseball glove': 40, 'tv': 72, 'traffic light': 10, 'chair': 62, 'bowl': 51, 
    'microwave': 78, 'bench': 15, 'book': 84, 'elephant': 22, 'orange': 55, 'tie': 32, 'clock': 85, 'bird': 16, 
    'knife': 49, 'pizza': 59, 'fork': 48, 'hair drier': 89, 'frisbee': 34, 'umbrella': 28, 'bottle': 44, 'bus': 6, 
    'bear': 23, 'vase': 86, 'toothbrush': 90, 'spoon': 50, 'train': 7, 'sink': 81, 'potted plant': 64, 'handbag': 31, 
    'cell phone': 77, 'toaster': 80, 'broccoli': 56, 'refrigerator': 82, 'laptop': 73, 'remote': 75, 'surfboard': 42, 
    'cow': 21, 'dining table': 67, 'hot dog': 58, 'car': 3, 'sports ball': 37, 'skateboard': 41, 'dog': 18, 'bed': 65, 
    'cat': 17, 'person': 1, 'skis': 35, 'giraffe': 25, 'truck': 8, 'parking meter': 14, 'suitcase': 33, 'cake': 61, 
    'wine glass': 46, 'baseball bat': 39, 'backpack': 27, 'zebra': 24
  }
  const categoryID = categorys[category]
  if(categoryID === -1 || !categoryID) 
    return Promise.reject(new Error('not found category'))
  return Promise.resolve(categoryID)
}

const loadImageIdWithCategory = (categoryID) => {
  const req = { "category_ids": [categoryID], querytype: "getImagesByCats" }
  axios.post('https://us-central1-open-images-dataset.cloudfunctions.net/coco-dataset-bigquery', req)
  .then(imageIds => Promise.resolve(imageIds))
  .catch(err => Promise.reject(err))
}

const loadImageData = (imageIds) => {
  const req= { "image_ids": imageIds, "querytype": "getImages" };
  axios.post('https://us-central1-open-images-dataset.cloudfunctions.net/coco-dataset-bigquery', req)
  .then((res) => {
    const allImg = res.data.map(x => ({url: x.flickr_url}))
    return Promise.resolve(allImg)
    // writeFile(allImg, (err) => {
    //   if(err) console.log(err)
    //   console.log(res)
    // })
  })
  .catch(err => Promise.reject(err))
}

function writeFile(allImg, cb) {
  fs.writeFile("bed.json", JSON.stringify(allImg), (err) => {
    if(err) cb(err)
    cb(null,'write-success-lew-naja')
  })
}

module.exports = {
  dood: (category) => {
    findCategory(category)
    .then(loadImageIdWithCategory)
    .then(loadImageData)
    .then(images => {
      return Promise.resolve(images)
    })
    .catch(err => Promise.reject(err))
  }
}
// loadImageData(bed.data)