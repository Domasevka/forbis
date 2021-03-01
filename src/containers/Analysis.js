import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import Menu from '../components/Menu/Menu';
import { getHtml } from '../actions';
import { connect } from 'react-redux';
import './style.css'


class Analysis extends Component {
    componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.setInputValue(this.props.value)
      }
    }

    getInputValue = () => {
      return this.input.value
    }

    setInputValue = (val) => {
      this.input.value = val
    }

    handleKeyUp = (e) => {
      if (e.keyCode === 13) {
        this.handleGoClick()
      }
    }

    handleGoClick = () => {
      const { dispatch } = this.props
      dispatch(getHtml(this.getInputValue()))
    }

    findTag = (elementsObject) => {
      const uniqueTag = []

      elementsObject.forEach(item => {
        if (!uniqueTag.includes(item.tagName)) {
          uniqueTag.push(item.tagName);
        }
      });
      return uniqueTag.map((item, index) => {
        return (
          <li key={item}>{item}</li> 
        )
     })
    }

    findCommonTag = (elementsObject) => {
      const commonTag = {};
      let maxEl = elementsObject[0]
      let maxCount = 1;

      elementsObject.forEach((item, index) => {
        if(commonTag[item.tagName] == null)
          commonTag[item.tagName] = 1;
            else
            commonTag[item.tagName]++;  
          if(commonTag[item.tagName] > maxCount){
              maxEl = item.tagName;
              maxCount = commonTag[item.tagName];
          }
      });
      return maxEl
    } 

    findLongestPath = (elementsObject, parseXmlString) => {
      const commonlyUsedTag = this.findCommonTag(elementsObject)

      let longestNode = [];
      let longestNodeCount = 0;
      
      const getNodeTree = (node) => {
        let currentTagCount = 0;
  
        if (node.nodeName === commonlyUsedTag.tagName) {
          currentTagCount += 1;
        }
  
        if (node.hasChildNodes()) {
          let childrenTree = [];
          let childrenTagCount = 0;
  
          for (let i = 0; i < node.childNodes.length; i += 1) {
            const { tree, tagCount } = getNodeTree(node.childNodes[i]);
  
            if (childrenTagCount <= tagCount) {
              childrenTagCount = currentTagCount + tagCount;
              childrenTree = [node.nodeName, ...tree];
            }
  
            if (longestNodeCount <= childrenTagCount) {
              longestNodeCount = childrenTagCount;
              longestNode = childrenTree;
            }
          }
  
          return {
            tree: childrenTree,
            tagCount: childrenTagCount,
          };
        }
  
        return {
          tree: [node.nodeName],
          tagCount: currentTagCount,
        };
      };
      getNodeTree(parseXmlString.documentElement);
  
      return (longestNode, longestNodeCount);
    }
 
    render(){
      const { htmlDocument } = this.props;
      const currentHtml = htmlDocument && htmlDocument.items;
      const xmlString = currentHtml
      const parseXmlString = new DOMParser().parseFromString(xmlString, "text/xml");
      const elementsObject = Array.from(parseXmlString.getElementsByTagName("*"));
      
      return (
        <>
          <div>
              <Menu /> 
          </div>
          <div>
            <h3>Type a URL and hit 'Send':</h3>
            <input size="45"
                  ref={(input) => this.input = input}
                  defaultValue={htmlDocument}
                  onKeyUp={this.handleKeyUp} 
                  className='input'/>
            <button onClick={this.handleGoClick} className='button'>
              Send
            </button>
          </div>
          <div>
            <p>1. Find all unique tags used in the document.</p>
            <ul>{this.findTag(elementsObject)}</ul>

            <p>2. Find the most commonly used tag.</p>
            <p>{this.findCommonTag(elementsObject)}</p>

            {htmlDocument &&
              <>
                <p>3. Find the longest path in the document tree where the most popular tag is used the most times.</p>
                <p>{this.findLongestPath(elementsObject, parseXmlString)}</p>
              </>
            }
          </div>
        </>
      )
    }
  }

  const mapStateToProps = state => {
		const { htmlInfo } = state
		const {
			isFetching,
			htmlDocument
		} = htmlInfo || {
			isFetching: true,
			items: []	
		}
	
		return {
			htmlDocument,
			isFetching
		}
	}

export default hot(connect(mapStateToProps)(Analysis));
