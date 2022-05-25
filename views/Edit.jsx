const React = require('react');
const DefaultLayout = require('./layout/DefaultLayout')


module.exports = class Edit extends React.Component {
    render() {

        const fruit = this.props.fruit;
        return (
           
            // This will work even without React Fragment names in the tags and just giving "<> </>" It happens under the hood istead of<React.Fragment></React.Fragment>

            <DefaultLayout title="Edit">
                <h1 style ={{color:'red'}}>Edit {fruit.name} </h1>

                <button>
                    <a href={`/fruits`}>Back</a>
                </button>  

                <form action ={`/fruits/${fruit._id}?_method=PUT`} method = "POST">
                    <br></br>
                    <label htmlFor='name'>Name</label>
                    <input type="text" id="name" name="name" defaultValue={fruit.name}></input>
                    <label htmlFor='color'>Color</label>
                    <input type="text" id="color" name="color" defaultValue={fruit.color}></input>
                    <label htmlFor='readyToEat'>Ready To Eat</label>
                    <input type="checkbox" id="readyToEat" name="readyToEat" checked = {fruit.readyToEat}></input>
                    <input type="submit" value="Confirm Edit"></input>

                </form>
            
                
            </DefaultLayout>

        )
    }
}