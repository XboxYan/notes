import React, { PureComponent } from 'react';
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

export default class extends PureComponent {
    componentDidMount() {
      var gitalk = new Gitalk({
        clientID: 'b36eae2069001417b114',
        clientSecret: '22b5da9b1fd92cca7268dfd0eaf4305ee427f0f2',
        repo: 'notes',
        owner: 'XboxYan',
        admin: ['XboxYan'],
        number:this.props.number,
        //id: window.location.pathname,      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
      })
      gitalk.render('gitalk-container')
    }
    render() {
        return (
            <div id="gitalk-container"></div>
        )
    }
}