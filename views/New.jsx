const React = require('react');
const DefaultLayout = require('./layout/DefaultLayout')


module.exports = class New extends React.Component {
    render() {
        return (
            
            // This will work even without React Fragment names in the tags and just giving "<> </>" It happens under the hood istead of<React.Fragment></React.Fragment>
            
            <DefaultLayout title = "New Page">
                {/* <h1>Create New Page</h1> */}
                <form action="/fruits" method='POST'>
                    <label htmlFor='name'>Name</label>
                    <input type="text" id="name" name="name"></input>
                    <label htmlFor='color'>Color</label>
                    <input type="text" id="color" name="color"></input>
                    <label htmlFor='readyToEat'>Ready To Eat</label>
                    <input type="checkbox" id="readyToEat" name="readyToEat"></input>
                    <input type="submit" value="Create Fruit"></input>
                </form>
            </DefaultLayout>
             
        )
    }
}