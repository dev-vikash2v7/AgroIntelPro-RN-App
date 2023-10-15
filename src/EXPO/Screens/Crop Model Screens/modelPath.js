
export default modelPath = {
    'potato':{
          jsonPath  : require('../../../../assets/disease_model/vgg16_model/quantz_potato_model_tfjs/model.json'),
          binPath : require('../../../../assets/disease_model/vgg16_model/quantz_potato_model_tfjs/group1-shard1of1.bin')
    },
    'rice':{
          jsonPath  : require('../../../../assets/disease_model/vgg16_model/quantz_rice_model_tfjs/model.json'),
          binPath : require('../../../../assets/disease_model/vgg16_model/quantz_rice_model_tfjs/group1-shard1of1.bin')
    },
    'wheat':{
          jsonPath  : require('../../../../assets/disease_model/vgg16_model/quantz_wheat_model_tfjs/model.json'),
          binPath : require('../../../../assets/disease_model/vgg16_model/quantz_wheat_model_tfjs/group1-shard1of1.bin')
    },
    'corn':{
          jsonPath  : require('../../../../assets/disease_model/vgg16_model/quantz_corn_model_tfjs/model.json'),
          binPath : require('../../../../assets/disease_model/vgg16_model/quantz_corn_model_tfjs/group1-shard1of1.bin')
    },
       
}

export const diseaseMapping = require('../../../../assets/disease_model/crop_disease_mapping.json');
