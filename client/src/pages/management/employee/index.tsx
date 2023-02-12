import Layout from "@/components/layout/Layout";
import styles from "./EmployeePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect , useCallback} from "react";
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
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import ErrorMsg from "@/components/errorMsg/ErrorMsg";

const db = getFirestore();
const EmployeePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [birthDate, setBirthDate] = useState<Date | null>();
    const [workStartDate, setWorkStartDate] = useState<Date | null>();
    const [name, setName] = useState<String>("");
    const [phoneNumber, setPhoneNumber] = useState<String>("");
  
    const [errMsg, setErrMsg] = useState({
        name:"",
    })
    
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

    const onClickHandler = useCallback(
      () => {
        const signInUid = sessionStorage.getItem("signIn")
        // const docRef = await setDoc(doc(db, "users", uid), {
        //     userUid: uid,
        //     role: "admin",
        //     email: email,
        // });
        console.log(signInUid)
 
        // if(errMsg === "") onClose();
        if(name === ""){
            setErrMsg((prevState)=>{
                const newErrMsg = {...prevState}
                newErrMsg.name = "이름을 입력하세요"
                return newErrMsg
            })
        }
        console.log(errMsg)
      },
      [],
    )

    useEffect(() => {
      console.log(errMsg)
    }, [errMsg])
    
    
    

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
                            <ErrorMsg>{errMsg.name}</ErrorMsg>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel fontWeight="bold">생년월일</FormLabel>
                            <DatePicker
                                selected={birthDate}
                                onChange={(date) => setBirthDate(date)}
                                className={styles.modalInput}
                                dateFormat="yyyy/MM/dd"
                                locale={ko}
                                
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
