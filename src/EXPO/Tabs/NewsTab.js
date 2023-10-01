import { View, Text  , ActivityIndicator , FlatList , StyleSheet , Image, Dimensions, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {COLORS} from '../../../constants/theme'
import { NEWS_API } from '../../../env'

const NewsList = () => {

  const[articles , setArticles] =   useState([])

 
  useEffect(()=>{
    console.log(process.env)
   const base_url = 'https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=' + NEWS_API
    axios.get(base_url )
    .then(res=>{
      // console.log("res : " ,  res.data.articles);
      setArticles(res.data.articles)
    })
    .catch(e=>{
      console.log("error : " , e)
    })
  } , [])

  return (
    
    <View style={styles.container}>

    <Text style = {styles.heading}> Top News For You </Text>

<View style = {styles.newsView}>
    { articles.length != 0 ?
      <FlatList
        data={articles}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (

          <TouchableOpacity style={styles.newsItem} onPress={() => {}}>

            <Image source={ { uri : item.urlToImage }} style={styles.img}/>

<View style = {{ width : 190 , justifyContent :'space-around'}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.source}>Source: {item.source.name}</Text>
</View>
          </TouchableOpacity>


        )}
      />
      :
      <ActivityIndicator size="large" color="#007BFF" />
    }
    </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal : 5,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical : 10,
  },
  heading: {
    fontSize : 20 , 
    fontWeight : '600',
    marginTop : 30,
    textAlign:'center',
    marginBottom : 10,
    textDecorationLine:'underline'
  },
  newsView:{
    marginTop : 5
  },
  newsItem: {
    marginBottom: 16,
    backgroundColor: COLORS.lightWhite,
    padding: 12,
    borderRadius: 8,
    flexDirection:'row',
    width : Dimensions.get('screen').width - 5,
    height : 250
  },
  img:{
width:120,
height:"100%",
resizeMode:'cover',
marginRight:10,
borderRadius:5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine : 'underline',
    textDecorationColor:'orange'
  },
  description: {
    fontSize: 12,
    marginTop: 8,
  },
  source: {
    fontSize: 14,
    color: 'gray',
  },
});





export default NewsList


//  [
//   {
//     "author": "Rakesh Patil", 

//     "content": "Despite touching all-time highs the nifty ended marginally down over the past five days. Valuations are increasingly getting a bit uncomfortable especially within the small and mid-cap space. The fro… [+888 chars]", 

//     "description": "Sensex Today | Stock Market LIVE Updates: Except power, all other sectoral indices are trading in the red, Coal India, Power Grid Corporation, NTPC, Bajaj Finance and M&amp;M are among the major gainers on the Nifty, while losers are HDFC Bank, Apollo Hospita…", 

//     "publishedAt": "2023-09-20T08:17:54Z", 

//     "source": {"id": null, "name": "Moneycontrol"},

//      "title": "Stock Market LIVE Updates: Nifty breaks 19,900, Sensex tanks 800 pts; HDFC Bank, JSW Steel top losers - Moneycontrol",
//       "url": "https://www.moneycontrol.com/news/business/markets/stock-market-live-sensex-nifty-50-share-price-gift-nifty-latest-updates-20-09-2023-11393991.html",

//       "urlToImage": "https://images.moneycontrol.com/static-mcnews/2023/09/Market_down1-770x433.jpeg"}, 
     
//   }]
     
     