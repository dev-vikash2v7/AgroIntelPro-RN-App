import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.vgg16 import preprocess_input
import json
from io import BytesIO
from PIL import Image

potato_disease_model = load_model('./saved_model/Disease_Prediction_Model/vgg16 model/vgg16_potato_disease_model.h5')
corn_disease_model = load_model('./saved_model/Disease_Prediction_Model/vgg16 model/vgg16_corn_disease_model.h5')
rice_disease_model = load_model('./saved_model/Disease_Prediction_Model/vgg16 model/vgg16_rice_disease_model.h5')
wheat_disease_model = load_model('./saved_model/Disease_Prediction_Model/vgg16 model/vgg16_wheat_disease_model.h5')

with open( "./saved_model/Disease_Prediction_Model/crop_disease_mapping.json", 'r') as json_file:
    crop_disease_mapping = json.load(json_file)


def get_pred_img(crop_type ,image_file ):


    if (crop_type == 'potato'):
        model = potato_disease_model 
    elif (crop_type == 'corn'):
            model = corn_disease_model 
    elif (crop_type == 'rice'):
            model = rice_disease_model 
    elif (crop_type == 'wheat'):
            model = wheat_disease_model 

    # Load and preprocess the uploaded image
    img = Image.open(BytesIO(image_file.read()))

    img = img.resize((224, 224))

    # Convert the image to a NumPy array
    img_array = np.array(img)

    img_array = img_array / 225.0
    img_array = np.expand_dims(img_array, axis=0)

    preprocess_img  =  preprocess_input(img_array)

    # print(img_array.shape)#(1,64,64,3)

   # Make predictions using the model
    predictions = model.predict(preprocess_img)
    # print('predictions  , ' , predictions)
    predicted_class = np.argmax(predictions, axis=1)[0]
    
    # print('predicted_class  , ' , predicted_class)

    # print(crop_disease_mapping)

     # Return the predicted class label
    return crop_disease_mapping[crop_type][predicted_class]