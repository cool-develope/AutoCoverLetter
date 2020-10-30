import React, { useState, useRef } from 'react';
import { Jumbotron, Popover, PopoverHeader, PopoverBody, Button, Input } from 'reactstrap';
import { getUser, isLogin } from '../utils/auth.js';
import { convert } from '../utils/builder.js';
import { useOnClickOutside } from '../utils/useClickOutside';

const BlogApp = (props) => {
	const { letter, updateCreate } = props;

	const username = getUser()['name'];
	const message = convert(letter?.message || "");

	const [activePopover, setActivePopover] = useState(-1);
	const [modify, setModify] = useState(message.text);

	const _ref = useRef();
	
  useOnClickOutside(_ref, () => {
		console.log('clikc outside', _ref);
		setActivePopover(-1)
	});

	return (
		<Jumbotron className="m-1 p-2">
			<h1>{letter?.title || ""}</h1>
			<div className="m-0 p-0">
				{
					message.html.map((element, i) => (
						element.type === "p" ?
							(<span>{element.value}<br /></span>) :
							(element.type === "div" ?
								(<span>{element.value}</span>) :
								(<span id={"Popover" + i}><b>{element.value}</b>
									<Popover placement="bottom" target={"Popover" + i} toggle={() => setActivePopover(activePopover === i ? -1 : i)} isOpen={activePopover === i}>
										<div ref={activePopover === i ? _ref : null}>

										<PopoverBody><Input placeholder={"Modify the " + element.type} autoFocus /></PopoverBody>
										</div>
									</Popover></span>))
					))
				}
			</div>
			<hr className="my-2" />
			{
				isLogin() ?
					(username == letter?.username ?
						<Button className="btn btn-success" onClick={updateCreate}>Update</Button> :
						<Button className="btn btn-success" onClick={updateCreate}>Modify</Button>) :
					<Button className="btn btn-secondary" disabled>Disable</Button>
			}

			<Button className="btn btn-info float-right">Copy</Button>
		</Jumbotron>
	);
};

export default BlogApp;