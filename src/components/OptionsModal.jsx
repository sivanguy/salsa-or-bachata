/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';
import STYLES from './Styles';

class OptionsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      genreButtonIsEnabled: this.props.genreIsEnabled,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.optionButtons = this.optionButtons.bind(this);
    this.handleOptionButtonClick = this.handleOptionButtonClick.bind(this);
  }

  toggleModal() {
    this.setState(
      (prevState) => ({ isModalOpen: !prevState.isModalOpen }),
    );
  }

  handleSubmit() {
    this.toggleModal();
    this.props.setEnabledGenres(this.state.genreButtonIsEnabled);
  }

  handleOptionButtonClick(genre) {
    this.setState(
      (prevState) => {
        const newGenreButtonIsEnabled = {
          ...prevState.genreButtonIsEnabled,
          [genre]: !prevState.genreButtonIsEnabled[genre],
        };

        // Only update if at least one genre remains enabled
        if (_.includes(newGenreButtonIsEnabled, true)) {
          return ({ genreButtonIsEnabled: newGenreButtonIsEnabled });
        }

        return null;
      },
    );
  }

  optionButtons() {
    const buttons = _.keys(this.props.genreIsEnabled).map((genre) => (
      <Button
        key={`${genre} answer button`}
        style={STYLES.genreButton}
        color={STYLES.genreButtonPreferredColors[genre] || 'secondary'}
        size="lg"
        onClick={() => this.handleOptionButtonClick(genre)}
        outline={!this.state.genreButtonIsEnabled[genre]}
      >
        {_.startCase(genre)}
      </Button>
    ));

    const buttonGroup = <ButtonGroup vertical>{buttons}</ButtonGroup>;

    return buttonGroup;
  }

  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <Button color="link" onClick={this.toggleModal}>Options</Button>
        <Modal
          isOpen={this.state.isModalOpen}
          size="sm"
          centered
          toggle={this.toggleModal}
        >
          <form className="App" onSubmit={this.handleSubmit}>
            <ModalHeader>Choose Genres</ModalHeader>
            <ModalBody>
              <Container fluid>
                <Row>
                  <Col>
                    {this.optionButtons()}
                  </Col>
                </Row>
              </Container>
            </ModalBody>
            <ModalFooter className="no-border">
              <Container fluid>
                <Row className="justify-content-center">
                  <Col>
                    <Button color="primary" onClick={this.handleSubmit}>Done</Button>
                  </Col>
                </Row>
              </Container>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

OptionsModal.propTypes = {
  genreIsEnabled: PropTypes.shape({}),
  setEnabledGenres: PropTypes.func.isRequired,
};

OptionsModal.defaultProps = {
  genreIsEnabled: {},
};

export default OptionsModal;
