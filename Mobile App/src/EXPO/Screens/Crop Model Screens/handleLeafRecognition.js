import * as Clarifai from "clarifai";
import * as FileSystem from 'expo-file-system';
import { CLARIFAI_API_KEY } from '../../../../env';


export default handleLeafRecognition = async (imageUrl) => {

  let isLeaf = false ;

  
  const clarifaiApp = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY
  });
 
    try {

      const imgB64 = await FileSystem.readAsStringAsync(imageUrl, {
        encoding: FileSystem.EncodingType.Base64,
      });

    await clarifaiApp.models.predict(
        Clarifai.GENERAL_MODEL ,
            { base64: imgB64 }
          )
          .then(response => {
            const { concepts } = response.outputs[0].data;

            if (concepts && concepts.length > 0) {
              for (const prediction of concepts) {
                // console.log('Prediction : ' , prediction.name  ,prediction.value )
                if(prediction.name == 'leaf' && prediction.value >= 0.9) {
                  isLeaf = true ;
                  return
                  }
              }
            }
        })
          .catch(err => console.log(err));

        }
         catch (error) {
          console.error('Clarifai API Error:', error);
        }

        return isLeaf;
    
    
  };

 