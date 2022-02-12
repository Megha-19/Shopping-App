import React from 'react'
import { View, FlatList,Text, Image } from 'react-native';

const OrderDetails = ({navigation}) => {
const item = navigation.getParam('item')
return <View style={{backgroundColor:"#0a111c",flex:1}}>
    <FlatList 
    data={item}
    renderItem={({item})=> <View>
        <View style={{flexDirection:"row",marginVertical:5}}>
        <Image source={{uri : `${item.image}`}} style={{height:150,width:150,borderRadius:8,overflow:"hidden"}} resizeMode="stretch"/>
        <View style={{margin:7}}>
            <Text style={{color:"white",fontSize:17,fontWeight:"bold"}}>{item.title} </Text>
            <Text style={{color:"white",fontSize:15}}>Price : ${item.price} </Text>
            <Text style={{color:"white",fontSize:15}}>Quantity:{item.quantity} </Text>
            </View>
            </View>
        </View>}
    
    />
</View>
}

export default OrderDetails;

