import React, { useState, useRef, useEffect } from 'react';
import { Jumbotron, Popover, PopoverBody, Button, Input } from 'reactstrap';
import { getUser, isLogin } from '../utils/auth.js';
import { convert } from '../utils/builder.js';
import { useOnClickOutside } from '../utils/useClickOutside';

const BlogApp = (props) => {
	const { letter, updateCreate } = props;

	const username = getUser()['name'];
	const message = convert(letter?.message || "");

	const [activePopover, setActivePopover] = useState(-1);
	const [modify, setModify] = useState([]);

	const _ref = useRef();
	const _text = useRef();

	const copyText = () => {
		const el = _text;
		
		navigator.clipboard.writeText(el.current.outerText);
	}

	useOnClickOutside(_ref, () => {
		setActivePopover(-1);
	});

	const onKeyUp = (event, value, index) => {
		if (event.key === "Enter") {
			setModify(prev => prev.map((element, i) => {
				if (i === index) {
					return { "type": element.type, "value": value };
				} else {
					return element;
				}
			}));
			setActivePopover(-1);
		}
	};

	useEffect(() => {
		setModify(message.html);
	}, [letter])

	return (
		<Jumbotron className="m-1 p-2">
			<h1>{letter?.title || ""}</h1>
			<div className="m-0 p-0" ref={_text}>
				{
					modify.map((element, i) => (
						element.type === "_p_" ?
							(<span key={"elementp_" + i}>{element.value}<br/></span>) :
							(element.type === "_div_" ?
								(<span key={"elementdiv_" + i}>{element.value}</span>) :
								(<span id={"Popover" + i} key={"Popover" + i}><b>{element.value}</b>
									<Popover id={"popover_" + i} placement="bottom" target={"Popover" + i} toggle={() => setActivePopover(activePopover === i ? -1 : i)} isOpen={activePopover === i}>
										<div ref={activePopover === i ? _ref : null}>
											<PopoverBody><Input placeholder={ element.type } onKeyPress={e => onKeyUp(e, e.target.value, i)} size="50" autoFocus /></PopoverBody>
										</div>
									</Popover></span>))
					))
				}
			</div>
			<hr className="my-2" />
			{
				isLogin() ?
					(username == letter?.username ?
						<Button className="btn btn-success" onClick={() => updateCreate("Update")}>Update</Button> :
						<Button className="btn btn-success" onClick={() => updateCreate("Modify")}>Modify</Button>) :
					<Button className="btn btn-secondary" disabled>Disable</Button>
			}

			<Button className="btn btn-info float-right" onClick={() => copyText()}>Copy</Button>
		</Jumbotron>
	);
};

export default BlogApp;