import React from 'react';
import Layout from './layout';
import { Link, ModalRoutingContext } from 'gatsby-plugin-modal-routing';
import styled from '@emotion/styled';

const CloseButtonContainer = styled.div`
	text-decoration: none;
	color: #000;
	text-align: end;
	font-size: 25px;
`;

const ConditionalLayout = ({ children, ...rest }) => (
	<ModalRoutingContext.Consumer>
		{({ modal, closeTo }) =>
			modal ? (
				<React.Fragment>
					<Link to={closeTo}>
						<CloseButtonContainer>X</CloseButtonContainer>
					</Link>
					{children}
				</React.Fragment>
			) : (
				<Layout {...rest}>{children}</Layout>
			)}
	</ModalRoutingContext.Consumer>
);

export default ConditionalLayout;
