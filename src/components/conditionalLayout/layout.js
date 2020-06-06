import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const LayoutHeaderContainer = styled.div`
	margin: 0 auto;
	max-width: 960px;
	padding: 0 1.1rem 1.45rem;
	text-align: center;
`;

const Layout = ({ children }) => {
	return (
		<LayoutHeaderContainer>
			<main>{children}</main>
		</LayoutHeaderContainer>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
