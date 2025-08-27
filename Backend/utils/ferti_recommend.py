import joblib 


ferti_encode = joblib.load('./saved_model/Ferti_Recommend_Model/encode_ferti.pkl')
crop_encode = joblib.load('./saved_model/Ferti_Recommend_Model/encode_crop.pkl')
soil_encode = joblib.load('./saved_model/Ferti_Recommend_Model/encode_soil.pkl')
model = joblib.load('./saved_model/Ferti_Recommend_Model/RF_Model.pkl')


def get_fertilizer( data  ):   

       
        feature = {
        "Temparature"     :   data['temperature'],
        "Humidity"         : data['humidity'],
        "Moisture"             : data['moisture'],
        "Soil Type"          : data['soil_type'],
        "Crop Type"         : data['crop_type'],
        "Nitrogen"           :   data['N'],
        "Potassium"         :     data['K'],
        "Phosphorous"         :   data['P']
        }

        print(feature)

        feature['Soil Type'] = soil_encode.transform([feature['Soil Type']])[0]
        feature['Crop Type'] = crop_encode.transform([feature['Crop Type']])[0]

        features_arr = list(feature.values())

        predictions_encoded = model.predict([features_arr])
        ferti_name = ferti_encode.inverse_transform(predictions_encoded)[0]

        return ferti_name

