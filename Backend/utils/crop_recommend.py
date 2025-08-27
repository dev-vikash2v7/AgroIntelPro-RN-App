import joblib

model = joblib.load('./saved_model/Crop_Recommend_Model/crop_recommend.pkl')
label_encoder = joblib.load('./saved_model/Crop_Recommend_Model/label_encoder.pkl')

def get_crop( data  ):  


        data['NPK Total'] = data['N'] + data['P'] + data['K']
        data['Nitrogen (%)'] = (data['N'] / data['NPK Total']) * 100
        data['Phosphorus (%)'] = (data['P'] / data['NPK Total']) * 100
        data['Potassium (%)'] = (data['K'] / data['NPK Total']) * 100


        data_arr = list(data.values())


        predictions_encoded = model.predict([data_arr])
        crop_name = label_encoder.inverse_transform(predictions_encoded)[0]


        return crop_name