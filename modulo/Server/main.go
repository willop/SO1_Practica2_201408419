package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Dentro del server de go\nLeyendo modulo cpu\n")

	for true {
		fmt.Println("Hola ")
		time.Sleep(3 * time.Second)
	}

	/*cmd := exec.Command("sh", "-c", "cat /proc/cpu_201408419")
	salida, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	json := string(salida[:])
	fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
	fmt.Println(json)
	*/
	/*cmd := exec.Command("sh", "-c", "cat /proc/cpuinfo")
	salida, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	json := string(salida[:])
	fmt.Println("**********************\ninfo de top\n*********************\n")
	fmt.Println(json)*/

}
