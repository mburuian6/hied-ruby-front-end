import react, { Component } from 'react';
import { Grid, TextareaAutosize, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        height: "auto",
        padding: "2em",
        margin: "1em",
        width: "100%"
    }
});

class JobForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            api_url: props.api_url,
            title: "",
            pay: "",
            start: "",
            open: true,
            description: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePayChange = this.handlePayChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();
        this.formSubmit(event.target);
        this.setState({
            title: '',
            pay: '',
            start: '',
            description: ''
        })
    }

    async formSubmit(formData) {
        var data = new FormData(formData);
        await fetch(this.state.api_url, {
            method: "POST",
            mode: "cors",
            body: data
        }).then(response => response.json())
            .then(response => this.props.updateJobList(response))

    }

    //changes to textfields
    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handlePayChange(event) {
        this.setState({
            pay: event.target.value
        })
    }

    handleStartChange(event) {
        this.setState({
            start: event.target.value
        })
    }

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        })
    }

    //render
    render() {
        return (
            <Grid>
                <Grid item xs></Grid>

                <Grid item xs={10}>
                    <form
                        onSubmit={this.handleSubmit}
                        id="job_entry_form"
                        autoComplete="off">

                        <TextField id="title" label="Title"
                            variant="outlined" type="text" value={this.state.title}
                            name="job[title]" onChange={this.handleTitleChange}
                        /> <br />

                        <TextField id="pay" label="Pay" variant="outlined"
                            type="number" value={this.state.pay}
                            name="job[pay]" onChange={this.handlePayChange} /> <br />

                        <TextField id="start" label="Start" variant="outlined"
                            type="datetime-local" value={this.state.start}
                            name="job[start]" onChange={this.handleStartChange} /><br />

                        <TextareaAutosize id="description" label="Description" variant="outlined"
                            type="text" value={this.state.description}
                            name="job[description]" onChange={this.handleDescriptionChange} /><br />

                        <Button variant="contained"
                            color="primary" type="submit">
                            Post Job
                        </Button>
                    </form>
                </Grid>

                <Grid item xs></Grid>
            </Grid>
        )
    }

}

export default JobForm;

