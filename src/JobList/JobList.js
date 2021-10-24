import React, {Component} from 'react';
import JobForm from '../JobForm/JobForm';
import JobItem from '../JobItem/JobItem';
import { Container, Grid } from '@mui/material';
import { API_JOBS_URL } from '../config';

const api_url = API_JOBS_URL ;

class JobList extends Component{

    constructor(props){
        super(props)

        this.state = {
            items:[]
        }

        this.updateJobList = this.updateJobList.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount(){
        this.getJobs();
    }

    getJobs(){
        fetch(api_url)
          .then(response => response.json())
          .then(response_items => {
              this.setState({
                  items: response_items.reverse()
              })
          });
    }

    updateJobList(item){
        let _items = this.state.items;
        _items.unshift(item);
        this.setState({
            items: _items
        })
    }

    deleteItem(item){
        var deleteUrl = api_url+`/${item.id}`;

        fetch(deleteUrl,{
            method:"DELETE"
        }).then(() => {
            var _items = this.state.items;
            var index = _items.indexOf(item);

            _items.splice(index,1);
            this.setState({
                items: _items
            })
        })
    }

    render(){
        return (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={12}>
                  <JobForm api_url={api_url} 
                    updateJobList={this.updateJobList}/>
                </Grid>
                
                
                    {this.state.items
                      .map((item) => (
                        <Grid item xs={2} sm={4} md={4} key={item.id} >
                          <JobItem                             
                            job={item}
                            jobId= {item.id}
                            deleteItem={this.deleteItem}
                          />
                        </Grid>
                      ))}
                
            </Grid>
        )
    }

}

export default JobList;

