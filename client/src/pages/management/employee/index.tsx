import Layout from "@/components/layout/Layout";
import styles from "./EmployeePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { GetServerSideProps } from "next";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

const db = getFirestore();
const EmployeePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [birthDate, setBirthDate] = useState<Date | null>();
    const [workStartDate, setWorkStartDate] = useState<Date | null>();
    const [name, setName] = useState<String>("");
    const [phoneNumber, setPhoneNumber] = useState<String>("");
    // useEffect(() => {
    //     const loadQuery = async () => {
    //         const querySnapshot = await getDocs(collection(db, "users"));
    //         querySnapshot.forEach((doc) => {
    //             // 가져온 모든 문서들을 확인
    //             console.log(doc.id, " => ", doc.data());
    //         });
    //     };
    //     loadQuery();
    // }, []);

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
                            <FormLabel fontWeight="bold" className="test">
                                이름
                            </FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="이름"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(e.target.value);
                                }}
                                required
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel fontWeight="bold">생년월일</FormLabel>
                            <DatePicker
                                selected={birthDate}
                                onChange={(date) => setBirthDate(date)}
                                className={styles.modalInput}
                                dateFormat="yyyy/MM/dd"
                                locale={ko}
                                required
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel fontWeight="bold">연락처</FormLabel>
                            <Input
                                placeholder="연락처"
                                value={phoneNumber}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPhoneNumber(e.target.value);
                                }}
                                required
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel fontWeight="bold">입사일</FormLabel>
                            <DatePicker
                                selected={workStartDate}
                                onChange={(date) => setWorkStartDate(date)}
                                className={styles.modalInput}
                                dateFormat="yyyy/MM/dd"
                                locale={ko}
                                required
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            저장
                        </Button>
                        <Button onClick={onClose}>취소</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Layout>
    );
};

export default EmployeePage;
