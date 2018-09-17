import React from "react";
import axios from "axios";
import { Input, Button } from "reactstrap";
import ImageUploader from 'react-images-upload';

// Src: https://codeburst.io/asynchronous-file-upload-with-node-and-react-ea2ed47306dd

export class FileUpload extends React.Component {

    constructor(props) {
        super(props); 

        this.state = { 
            uploadStatus: false,
            pictures: [] 
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

   
    onDrop(picture) { 
        if(picture && picture.length == 0) { 
            return;
        }

        this.setState({
            pictures: this.state.pictures.concat(picture),
        }, () => this.handleUploadImage());  
    }
  
    handleUploadImage() {  
      console.log(Object.assign({}, this.state));
      if(this.state.pictures.length == 0) return;

      const data = new FormData();
      data.append('file', this.state.pictures[0]);
      data.append('filename', this.state.pictures[0].name);
      data.append('type', this.props.name);
  
      axios.post('/api/v1/upload', data)
        .then((response) => {
            console.log(response);
            this.setState({ imageURL: `/${response.data.file}`, uploadStatus: true }); 
            if(this.props.onFinish) {
                this.props.onFinish(`/${response.data.file}`);
            }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
    render() { 
        return (
            <ImageUploader
                style={this.props.style || {}}
                fileContainerStyle={this.props.containerStyle || {background: 'none', boxShadow: 'none'}}
                withLabel={true}
                label={""}
                singleImage={true}
                withIcon={false}
                buttonText='Browse..'
                onChange={this.onDrop}
                buttonClassName={'btn btn-warning'}
                imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
                maxFileSize={5242880}
            />
            );
    }
   
} 