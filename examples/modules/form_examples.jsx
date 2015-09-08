"use strict";

var React = require("react");
var _       = require("underscore");
var Markdown = require("react-markdown-el");
var {Alert} = require("react-bootstrap");

var {Form,
     FormMixin,
     TextEditGroup,
     Schema,
     Attr,
     ChooserGroup} = require("../../index");

var text = require("raw!../markdown/form_examples.md");

var description = "This shows a simple form where the schema and values of the form are loaded " +
                  "at some future time, such as if they were read from a REST API.";

//var text = "Testing *this* markdown";

var schema = (
    <Schema>
        <Attr name="type" label="Type" placeholder="Enter contact type" required={true}/>
        <Attr name="first_name" label="First name" placeholder="Enter first name" required={true} validation={{"type": "string"}}/>
        <Attr name="last_name" label="Last name" placeholder="Enter last name" required={true} validation={{"type": "string"}}/>
        <Attr name="email" label="Email" placeholder="Enter valid email address" validation={{"format": "email"}}/>
    </Schema>
);

var values = {
    "first_name": "Bill",
    "last_name": "Jones",
    "email": "bill@gmail.com"
};

/**
 * Edit a contact
 */
var ContactForm = React.createClass({

    mixins: [FormMixin],

    displayName: "ContactForm",

    /**
     * Save the form
     */
    handleSubmit: function(e) {
        e.preventDefault();

        //Example of checking if the form has missing values and turning required On
        if (this.hasMissing()) {
            this.showRequiredOn();
            return;
        }

        //Example of fetching current and initial values
        console.log("initial email:", this.initialValue("email"), "final email:", this.value("email"));

        this.props.onSubmit && this.props.onSubmit(this.getValues());

        return false;
    },

    renderForm: function() {
        var disableSubmit = this.hasErrors();
        var formStyle = {background: "#FAFAFA", padding: 10, borderRadius:5};
        var types = [{id: 0, label: "Friend"},
                     {id: 1, label: "Acquaintance"}]
        return (
            <Form style={formStyle}>
                <div>
                    <ChooserGroup attr="type" width={150}
                                  initialChoice={0}
                                  initialChoiceList={types}
                                  disableSearch={true}/>
                </div>
                <TextEditGroup attr="first_name" width={300} />
                <TextEditGroup attr="last_name" width={300} />
                <TextEditGroup attr="email" />
                <hr />
                <input className="btn btn-default" type="submit" value="Submit" disabled={disableSubmit}/>
            </Form>
        );
    }
});

var FormExample = React.createClass({

    getInitialState: function() {
        return {
            "data":  undefined,
            "loaded": false,
        };
    },

    componentDidMount: function() {
        var self = this;

        //Simulate ASYNC state update
        setTimeout(function() {
            self.setState({
                "loaded": true
            });
        }, 1500);
    },

    handleChange: function(a, b) {
        console.log("Form changed", a, b)
    },

    handleSubmit: function(value) {
        this.setState({"data": value});
    },

    handleAlertDismiss: function() {
        this.setState({"data": undefined});
    },

    renderAlert: function() {
        if (this.state && this.state.data) {
            var firstName = this.state.data["first_name"];
            var lastName = this.state.data["last_name"];
            return (
                <Alert bsStyle="success" onDismiss={this.handleAlertDismiss} style={{margin: 5}}>
                    <strong>Success!</strong> {firstName} {lastName} was submitted.
                </Alert>
            );
        } else {
            return null;
        }
    },

    renderContactForm: function() {
        if (this.state.loaded) {
            return (
                <ContactForm schema={schema} values={values} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
            );
        } else {
            return (
                <div style={{marginTop: 50}}><b>Loading...</b></div>
            );
        }
    },

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Contact form</h3>
                        <div style={{marginBottom: 20}}>{description}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-9">
                        {this.renderContactForm()}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-9">
                        {this.renderAlert()}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div style={{borderTopStyle: "solid",
                                    borderTopColor: "rgb(244, 244, 244)",
                                    paddingTop: 5,
                                    marginTop: 20}}>
                            <Markdown text={text}/>
                        </div>
                    </div>
                </div>

            </div>



        );
    }
});

module.exports = FormExample;