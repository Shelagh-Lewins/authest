import React, { Component } from 'react';

import { LIST_IS_PUBLIC_VALUES } from '../constants';
import { LIST_IS_PUBLIC_TEXTS } from '../constants';

export default class SelectList extends Component {
	render() {
		const listOptions = Object.keys(this.props.lists).map(is_public => {
			const listsByIsPublic = this.props.lists[is_public];
			const options = listsByIsPublic.map(list => {
				const index = LIST_IS_PUBLIC_VALUES.indexOf(is_public === 'true');
				return (
					<option key={list.id} value={list.id}>
						{list.title} ({LIST_IS_PUBLIC_TEXTS[index]})
					</option>
				);
			});

			return options;
		});

		// don't render select until default selection is available
		return (
			<div className="header">
				{this.props.currentListId && (
					<div className="list-select">
						<label>List:
							<select onChange={this.props.onCurrentListChange} className="list-menu form-control" value={this.props.currentListId}>
								{listOptions}
							</select>
						</label>
					</div>
				)}
			</div>
		);
	};
}
