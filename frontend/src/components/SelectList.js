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

		// if previously selected list has been deleted, there should be no selection
		const currentListId = this.props.currentListId || '';

		// don't render select until lists are available
		return (
			<div className="header">
				{this.props.lists && (
					<div className="list-select">
						<label>List:
							<select onChange={this.props.onCurrentListChange} className="list-menu form-control" value={currentListId}>
								{listOptions}
							</select>
						</label>
					</div>
				)}
			</div>
		);
	};
}
