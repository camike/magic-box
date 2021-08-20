import React from 'react';


interface IProps {
    hasTint: boolean,
    rawText: string
}

class BeautifulHTML extends React.Component<IProps> {
    html = null;
    style = "div.header{border-bottom:2px solid black;padding-bottom:5px;margin:10px}div.folder>div.hidden{display:none}div.folder>span.hidden{display:none}.pretty-print{margin-top:1em;margin-left:20px;font-family:monospace;font-size:13px}#webkit-xml-viewer-source-xml{display:none}.opened{margin-left:1em}.comment{white-space:pre}.folder-button{-webkit-user-select:none;cursor:pointer;display:inline-block;margin-left:-10px;width:10px;background-repeat:no-repeat;background-position:left top;vertical-align:bottom}.fold{background:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='%23909090' width='10' height='10'><path d='M0 0 L8 0 L4 7 Z'/></svg>\");height:10px}.open{background:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='%23909090' width='10' height='10'><path d='M0 0 L0 8 L7 4 Z'/></svg>\");height:10px}body{margin:0}table{width:100%;border-spacing:0;white-space:pre-wrap!important;margin:0;word-break:break-word;font-size:initial;font-family:monospace;tab-size:4}td{padding:0!important;vertical-align:baseline}.line-gutter-backdrop,.line-number{box-sizing:border-box;padding:0 4px!important;width:31px;background-color:#f0f0f0;border-right:1px solid #bbb!important;-webkit-user-select:none}.line-gutter-backdrop{position:absolute;z-index:-1;left:0;top:0;height:100%}.line-number{text-align:right;color:#808080;word-break:normal;white-space:nowrap;font-size:9px;font-family:Helvetica;-webkit-user-select:none}.line-number::before{content:attr(value)}tbody:last-child .line-content:empty:before{content:' '}.line-content{padding:0 5px!important}.html-tag{color:#881280}.html-attribute-name{color:#994500}.html-attribute-value{color:#1a1aa6}.html-external-link,.html-resource-link{color:#00e}.html-external-link{text-decoration:none}.html-external-link:hover{text-decoration:underline}.html-comment{color:#236e25}.html-doctype{color:#c0c0c0}.html-end-of-file{color:#f00;font-weight:bold}"
    script = 'function toggleFunction(sectionId){return function(){var foldedContent=document.querySelector("#"+sectionId+" > .folded");var openedContent=document.querySelector("#"+sectionId+" > .opened");var folderButton=document.querySelector("#"+sectionId+" > .line > .folder-button");if(foldedContent){if(foldedContent.className.includes("hidden")){foldedContent.className="folded"}else{foldedContent.className="folded hidden"}}if(openedContent){if(openedContent.className.includes("hidden")){openedContent.className="opened"}else{openedContent.className="opened hidden"}}if(folderButton){if(folderButton.className.includes("open")){folderButton.className="folder-button fold"}else{folderButton.className="folder-button open"}}}}function initButtons(){var sections=document.querySelectorAll(".folder");for(var i=0;i<sections.length;i++){var sectionId="folder"+i;sections[i].id=sectionId;var folderButton=sections[i].querySelector(".folder-button");folderButton.onclick=toggleFunction(sectionId);folderButton.onmousedown=handleButtonMouseDown}}function handleButtonMouseDown(e){e.preventDefault()}; initButtons();';
    
    constructor(props) {
        super(props);
        this.parse();
    }

    componentDidMount() {
        eval(this.script);
    }
  
    render() {
        return <div dangerouslySetInnerHTML={{__html: this.getHtml()}}></div>
    }

    // public
    getHtml = () => {
      return this.html.outerHTML;
    }
  
    // public
    draw = (parentElement) => {
      parentElement.innerHTML = this.getHtml();
      eval(this.script);
    }
  
    parse = () => {
      this.html = this.createHTMLElement('html');
      const head = this.createHTMLElement('head');
      this.html.appendChild(head);
      const style = this.createHTMLElement('style');
      style.id = 'xml-viewer-style';
      style.innerText = this.style;
      head.appendChild(style);
      const body = this.createHTMLElement('body');
      this.html.appendChild(body);
  
      if (this.props.hasTint) {
        const header = this.createHTMLElement('div');
        body.appendChild(header);
        header.classList.add('header');
        const headerSpan = this.createHTMLElement('span');
        header.appendChild(headerSpan);
        headerSpan.textContent =
          'This XML file does not appear to have any style information ' +
          'associated with it. The document tree is shown below.';
        header.appendChild(this.createHTMLElement('br'));
      }
  
      const tree = this.createHTMLElement('div');
      body.appendChild(tree);
      tree.classList.add('pretty-print');
      const script = document.createElement('script');
      script.text = this.script;
      body.appendChild(script);
  
      const doc = new DOMParser().parseFromString(this.props.rawText, "text/html");
      for (let child = doc.firstChild; child; child = child.nextSibling)
        this.processNode(tree, child);
    }
  
    processNode = (parentElement, node) => {
      switch (node.nodeType) {
        case Node.PROCESSING_INSTRUCTION_NODE:
          this.processProcessingInstruction(parentElement, node);
          break;
        case Node.ELEMENT_NODE:
          this.processElement(parentElement, node);
          break;
        case Node.COMMENT_NODE:
          this.processComment(parentElement, node);
          break;
        case Node.TEXT_NODE:
          this.processText(parentElement, node);
          break;
        case Node.CDATA_SECTION_NODE:
          this.processCDATA(parentElement, node);
          break;
        default:
        // No-op for unsupported node types e.g. Node.DOCUMENT_FRAGMENT_NODE.
      }
    }
  
    processElement = (parentElement, node) => {
      if (!node.firstChild)
        this.processEmptyElement(parentElement, node);
      else {
        const child = node.firstChild;
        if (child.nodeType == Node.TEXT_NODE && !child.nextSibling)
          this.processShortTextOnlyElement(parentElement, node);
        else
          this.processComplexElement(parentElement, node);
      }
    }
  
    processEmptyElement = (parentElement, node) => {
      const line = this.createLine();
      line.appendChild(this.createTag(node, false, true));
      parentElement.appendChild(line);
    }
  
    processShortTextOnlyElement = (parentElement, node) => {
      const line = this.createLine();
      line.appendChild(this.createTag(node, false, false));
      for (let child = node.firstChild; child; child = child.nextSibling)
        line.appendChild(this.createText(child.nodeValue));
      line.appendChild(this.createTag(node, true, false));
      parentElement.appendChild(line);
    }
  
    processComplexElement = (parentElement, node) => {
      const folder = this.createFolder();
      folder.start.appendChild(this.createTag(node, false, false));
  
      for (let child = node.firstChild; child; child = child.nextSibling)
        this.processNode(folder.openedContent, child);
  
      folder.end.appendChild(this.createTag(node, true, false));
  
      parentElement.appendChild(folder);
    }
  
    processComment = (parentElement, node) => {
      const line = this.createLine();
      line.appendChild(this.createComment('<!-- ' + node.nodeValue + ' -->'));
      parentElement.appendChild(line);
    }
  
    processCDATA = (parentElement, node) => {
      const line = this.createLine();
      line.appendChild(this.createText('<![CDATA[ ' + node.nodeValue + ' ]]>'));
      parentElement.appendChild(line);
    }
  
    processProcessingInstruction = (parentElement, node) => {
      const line = this.createLine();
      line.appendChild(
        this.createComment('<?' + node.nodeName.toLowerCase() + ' ' + node.nodeValue + '?>'));
      parentElement.appendChild(line);
    }
  
    processText = (parentElement, node) => {
      parentElement.appendChild(this.createText(node.nodeValue));
    }
  
    createHTMLElement = (elementName) => {
      return document.createElement(elementName)
    }
  
    createFolder = () => {
      const folder = this.createHTMLElement('div');
      folder.classList.add('folder');
  
      folder.start = this.createLine();
      folder.start.appendChild(this.createFolderButton());
      folder.appendChild(folder.start);
  
      folder.openedContent = this.createHTMLElement('div');
      folder.openedContent.classList.add('opened');
      folder.appendChild(folder.openedContent);
  
      // Folded content.
      folder.foldedContent = this.createText('...');
      folder.foldedContent.classList.add('folded');
      folder.foldedContent.classList.add('hidden');
      folder.appendChild(folder.foldedContent);
  
      folder.end = this.createLine();
      folder.appendChild(folder.end);
  
      return folder;
    }
  
    createFolderButton = (str?) => {
      const button = this.createHTMLElement('span');
      button.classList.add('folder-button');
      button.classList.add('fold');
      return button;
    }
  
    createComment = (commentString) => {
      const comment = this.createHTMLElement('span');
      comment.classList.add('comment');
      comment.classList.add('html-comment');
      comment.textContent = commentString;
      return comment;
    }
  
    createText = (value) => {
      const text = this.createHTMLElement('span');
      text.textContent = value;
      return text;
    }
  
    createLine = () => {
      const line = this.createHTMLElement('div');
      line.classList.add('line');
      return line;
    }
  
    createTag = (node, isClosing, isEmpty) => {
      const tag = this.createHTMLElement('span');
      tag.classList.add('html-tag');
  
      let stringBeforeAttrs = '<';
      if (isClosing)
        stringBeforeAttrs += '/';
      stringBeforeAttrs += node.nodeName.toLowerCase();
      const textBeforeAttrs = document.createTextNode(stringBeforeAttrs);
      tag.appendChild(textBeforeAttrs);
  
      if (!isClosing) {
        for (let i = 0; i < node.attributes.length; i++)
          tag.appendChild(this.createAttribute(node.attributes[i]));
      }
  
      let stringAfterAttrs = '';
      if (isEmpty)
        stringAfterAttrs += '/';
      stringAfterAttrs += '>';
      const textAfterAttrs = document.createTextNode(stringAfterAttrs);
      tag.appendChild(textAfterAttrs);
  
      return tag;
    }
  
    createAttribute = (attributeNode) => {
      const attribute = this.createHTMLElement('span');
      attribute.classList.add('html-attribute');
  
      const attributeName = this.createHTMLElement('span');
      attributeName.classList.add('html-attribute-name');
      attributeName.textContent = attributeNode.name;
  
      const textBefore = document.createTextNode(' ');
      const textBetween = document.createTextNode('="');
  
      const attributeValue = this.createHTMLElement('span');
      attributeValue.classList.add('html-attribute-value');
      attributeValue.textContent = attributeNode.value;
  
      const textAfter = document.createTextNode('"');
  
      attribute.appendChild(textBefore);
      attribute.appendChild(attributeName);
      attribute.appendChild(textBetween);
      attribute.appendChild(attributeValue);
      attribute.appendChild(textAfter);
      return attribute;
    }
  }

  export default BeautifulHTML;