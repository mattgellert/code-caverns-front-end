import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/textmate'
import ErrorCard from './ErrorCard';
import OutputCard from './OutputCard';

export default class Editor extends React.Component {

  state = {
    error: null,
    output: null,
    currentCode: this.props.editor.code
  }

  handleChange = (input) => { //make sure to send this to APP
    this.setState({
      currentCode: input
    });
  }

  onRun = () => {
    this.setState({
      error: null
    }, () => {
      const inputArray = this.props.editor.input.slice();
      const sortedArray = this.props.editor.expectedOutput;
      try {
        const userFunction = eval( `(${this.state.currentCode})` );
        const pass = JSON.stringify(userFunction(inputArray)) === JSON.stringify(sortedArray);
        console.log("passed:", pass)
        pass ? this.props.onPass(this.props.editor.name) : null;
        this.props.handleRun(userFunction(inputArray))
        this.setState({
          output: JSON.stringify(userFunction(inputArray))
        })
      } catch(e) {
        this.setState({
          error: `${e.name}: ${e.message}`
        })
      }
    });
  }


  onQuit = () => {
    this.props.onQuit(this.props.editor.name, this.state.currentCode, this.props.editor.pass);
  };


  render() {
    return (
      <div className="editor-wrapper">
        <AceEditor
          theme="textmate"
          mode="javascript"
          onChange={this.handleChange}
          name="editor"
          editorProps={{$blockScrolling: true}}
          value={this.state.currentCode}
        />
        <ErrorCard message={this.state.error} />
        <OutputCard output={this.state.output} />
        <button onClick={this.onRun}>Run</button>
        {this.props.editor.pass ? <button onClick={this.onQuit}>Continue!</button> : <button onClick={this.onQuit}>Quit</button>}
      </div>
    )
  }
};
