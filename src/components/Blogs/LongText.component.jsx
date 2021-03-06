import React, { useState } from 'react';
import './style.css';

const LongText = (props) => {
	const [showAll, setShowAll] = useState(false);

	const { content, limit } = props;

	if (content.length <= limit) {
		// there is nothing more to show
		return <div>{content}</div>;
	}
	if (showAll) {
		// We show the extended text and a link to reduce it
		return (
			<div>
				<pre>{content}</pre>
				<span
					style={{
						fontWeight: 600,
						cursor: 'pointer',
						color: 'grey',
					}}
					onClick={() => setShowAll(false)}
				>
					Read less
				</span>
			</div>
		);
	}
	// In the final case, we show a text with ellipsis and a `Read more` button
	const toShow = content.substring(0, limit) + '...';
	return (
		<React.Fragment>
			{toShow}
			<span
				style={{ fontWeight: 600, cursor: 'pointer', color: 'blue' }}
				onClick={() => setShowAll(true)}
			>
				Read more
			</span>
		</React.Fragment>
	);
};

export default LongText;
