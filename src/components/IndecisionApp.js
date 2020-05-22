import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header'
import Action from './Action';
import OptionModal from './OptionModal'

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: false
    };

    handleDeleteOptions = () => {
        this.setState(() => ( { options: []} ));
    };

    handleDeleteOption = (option) =>  {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter( (prevOption) => prevOption !== option )
            }
        })
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
    };

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } 
        
        if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    };

    handleCloseModal = () => {
        this.setState(() => ({
            selectedOption: undefined
        }));
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
    
            if (options) {
                this.setState(() => ({ options }));
            }
        }
        catch (e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className='container'>
                    <Action 
                        handlePick={this.handlePick}
                        hasOptions={this.state.options.length > 0}/>
                        <div className='widget'>
                            <Options 
                                options={this.state.options}
                                handleDeleteOptions={this.handleDeleteOptions}
                                handleDeleteOption={this.handleDeleteOption}/>
                            <AddOption handleAddOption={this.handleAddOption}/>
                        </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleCloseModal={this.handleCloseModal}/>
            </div>
        );
    }
}

export default IndecisionApp;