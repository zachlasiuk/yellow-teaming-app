import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

const ModalForInterest = ({ triggerText = 'Click Me', modalTitle = 'We Value Your Interest' }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controls modal state
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // Disable submit button initially
  const toast = useToast(); // Chakra toast for feedback

  // Validate email and reason to enable/disable submit button
  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
    setIsSubmitDisabled(!(isValidEmail && reason.trim().length > 0));
  }, [email, reason]);

  const handleSubmit = () => {
    if (!isSubmitDisabled) {
      // Simulate sending data (replace with actual API logic)
      toast({
        title: 'Interest Logged',
        description: 'Thank you! We’ll reach out to you if we expand our services.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        variant: 'toast', 
      });
      onClose();
      setEmail('');
      setReason('');
    }
  };

  return (
    <>
      <Button 
        onClick={onOpen}
        isDisabled={true}>
            {triggerText}
    </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>We'd love to hear from you! Tell us why you're interested in using this tool.</p>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Reason for Interest</FormLabel>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us why you're interested"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              isDisabled={isSubmitDisabled} // Disable submit button until valid input
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForInterest;
