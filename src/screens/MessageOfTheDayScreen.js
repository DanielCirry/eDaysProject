import React from "react"
import {Text, View, StyleSheet, Image } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import { Dropdown } from 'react-native-material-dropdown-v2';

export default class MessageOfTheDayScreen extends React.Component{
    state = {
        data: {},
        message: "",
        error: "",
        value: 0,
        days:[
            {
                label: 'Sunday',
                value: 0
             },{
                label: 'Monday',
                value: 1
             },{
                label: 'Tuesday',
                value: 2
             },{
                label: 'Wednesday',
                value: 3
             },{
                label: 'Thursday',
                value: 4
             },{
                label: 'Friday',
                value: 5
             },{
                label: 'Saturday',
                value: 6
             },
        ]
    };

    getCurrentDay = () =>{        
        return new Date().getDay();
    };

    componentDidMount = () =>{
        const day = this.getCurrentDay();
        this.fetchData(day);        
        };

        componentDidUpdate(prevProps,prevState){  
            const value = this.state.value;    
            if(prevState.value != value){
                this.fetchData(value);
            }
        };

        fetchData = (value) =>{    
        const day = this.state.days;

            const self = this;
        axios.get(`https://edaysservice.azurewebsites.net/edays/days/${day[value].label}`
        ).then(function(response){
            self.setState({
                data: response.data,
                message: response.data.message,
                error: "",
            })
            })
            .catch(function(error){
                self.setState({error});

            });
        }
        onChangeText = (value) => {
            this.setState({value});
        }
        render(){
            const data = this.state;            
            return (
                <Container>
                    <Text>
                        {data.data.message}
                    </Text>
                    <ImageContainer
                    source={{uri: data.data.imageUri}}/>
                    <Dropdown
                    value={data.days.label}
                    data={data.days}
                    pickerStyle={{borderBottomColor:'transparent',borderWidth: 0}}
                    containerStyle = {styles.dropdown}
                    dropdownOffset={{ 'top': 0 }}
                    onChangeText={(value)=> {this.onChangeText(value)}}
                    label='Days of the week'
            />
                </Container>
            );
        }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    dropdown: {
      width: '80%',
    }
  });
  
  const Container = styled(View)`
flex: 1;
background-color: #fff;
align-items: center;
justify-content: center;
`;

const ImageContainer = styled(Image)`
height:30%;
width:30%;
position: relative;
`;