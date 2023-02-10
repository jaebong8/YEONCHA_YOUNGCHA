import Layout from "@/components/layout/Layout";
import styles from "./EmployeePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";

const EmployeePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    return (
        <Layout>
            <section className={styles.container}>
                <button onClick={onOpen}>
                    <FontAwesomeIcon icon={faCirclePlus} /> <span>직원 추가하기</span>
                </button>
                <table>
                    <caption>직원 목록</caption>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>생년월일</th>
                            <th>연락처</th>
                            <th>입사일</th>
                            <th>년차</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>박재현</td>
                            <td>900803</td>
                            <td>01099571597</td>
                            <td>2023년 1월 1일</td>
                            <td>1년차</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>직원 추가하기</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>이름</FormLabel>
                            <Input ref={initialRef} placeholder="이름" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>생년월일</FormLabel>
                            <Input placeholder="생년월일" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>연락처</FormLabel>
                            <Input placeholder="연락처" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>입사일</FormLabel>
                            <Input placeholder="입사일" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>년차</FormLabel>
                            <Input placeholder="년차" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Layout>
    );
};

export default EmployeePage;
