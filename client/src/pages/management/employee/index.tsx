import Layout from "@/components/layout/Layout";
import styles from "./EmployeePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, useCallback, SetStateAction, useContext } from "react";
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
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import { GetServerSideProps } from "next";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc } from "firebase/firestore";
import ErrorMsg from "@/components/errorMsg/ErrorMsg";
import { GlobalContext } from "@/pages/_app";

const db = getFirestore();
const EmployeePage = () => {
    const userInfo = useContext(GlobalContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [birthDate, setBirthDate] = useState<Date | null>();
    const [workStartDate, setWorkStartDate] = useState<Date | null>();
    const [name, setName] = useState<String>("");
    const [phoneNumber, setPhoneNumber] = useState<String>("");

    const [nameErrMsg, setNameErrMsg] = useState<String | boolean>("");
    const [birthErrMsg, setBirthErrMsg] = useState<String | boolean>("");
    const [phoneErrMsg, setPhoneErrMsg] = useState<String | boolean>("");
    const [workStartErrMsg, setWorkStartErrMsg] = useState<String | boolean>("");

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

    const checkEmpty = useCallback((value: any, setValue: any, Msg: string) => {
        if (String(value).trim().length === 0 || value === undefined || value === null) {
            setValue(Msg);
        } else {
            setValue(false);
        }
    }, []);

    const onClickHandler = useCallback(async () => {
        if (nameErrMsg === false && birthErrMsg === false && phoneErrMsg === false && workStartErrMsg === false) {
            const signInUid = sessionStorage.getItem("signIn");
            const id = Object.keys(userInfo).length + 1;
            try {
                const userDocRef = doc(db, "workers", signInUid);
                await updateDoc(userDocRef, {
                    [name]: {
                        name,
                        birthDate,
                        workStartDate,
                        phoneNumber,
                        id,
                    },
                });
                console.log("등록 완료");
            } catch (error) {
                console.log(error);
            }
        }
    }, [nameErrMsg, birthErrMsg, phoneErrMsg, workStartErrMsg]);
    useEffect(() => {
        checkEmpty(name, setNameErrMsg, "이름을 입력해주세요.");
        checkEmpty(birthDate, setBirthErrMsg, "생년월일을 입력해주세요.");
        checkEmpty(workStartDate, setWorkStartErrMsg, "입사일을 입력해주세요.");
        if (/\D/g.test(String(phoneNumber))) {
            setPhoneErrMsg("숫자만 입력해주세요");
        } else {
            checkEmpty(phoneNumber, setPhoneErrMsg, "핸드폰번호를 입력해주세요.");
        }
    }, [name, birthDate, workStartDate, phoneNumber]);

    useEffect(() => {
        if (!isOpen) {
            setBirthDate(null);
            setWorkStartDate(null);
            setName("");
            setPhoneNumber("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (Object.keys(userInfo).length !== 0) {
            console.log(userInfo, "userInfo");
        }
    }, [userInfo]);

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
                            <ErrorMsg>{nameErrMsg}</ErrorMsg>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel fontWeight="bold">생년월일</FormLabel>
                            <DatePicker
                                selected={birthDate}
                                onChange={(date) => setBirthDate(date)}
                                className={styles.modalInput}
                                dateFormat="yyyy/MM/dd"
                                locale={ko}
                                placeholderText={"예시) 1234/12/23"}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                            <ErrorMsg>{birthErrMsg}</ErrorMsg>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel fontWeight="bold">연락처</FormLabel>
                            <Input
                                placeholder="예시) 01012345678"
                                value={phoneNumber}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPhoneNumber(e.target.value);
                                }}
                                required
                            />
                            <ErrorMsg>{phoneErrMsg}</ErrorMsg>
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
                                placeholderText={"예시) 1234/12/23"}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                            <ErrorMsg>{workStartErrMsg}</ErrorMsg>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClickHandler}>
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
